'use server';

/**
 * @fileOverview An AI agent that finds job openings based on a user's query.
 * This file defines a Genkit "flow" that uses an AI tool to search for jobs.
 *
 * This flow:
 * 1. Defines a `findJobs` tool that simulates searching a job board.
 * 2. Defines the input (`FindJobsInput`) and output (`FindJobsOutput`) schemas.
 * 3. Creates a prompt that instructs the AI to use the tool to answer the user's request.
 * 4. Defines the main flow (`findJobsFlow`) that orchestrates the AI call.
 * 5. Exports a wrapper function (`findJobs`) to be used as a Server Action.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Mock job data to simulate API results
const MOCK_JOBS = [
  {
    title: 'Frontend Developer',
    company: 'Innovatech',
    location: 'San Francisco, CA',
    description:
      'We are looking for a skilled Frontend Developer to build and maintain our user-facing web applications.',
    url: '#',
  },
  {
    title: 'Senior React Engineer',
    company: 'Solutions Co.',
    location: 'New York, NY (Remote)',
    description:
      'Join our team as a Senior React Engineer and help us build the next generation of our platform.',
    url: '#',
  },
  {
    title: 'UX/UI Designer',
    company: 'Creative Minds',
    location: 'Austin, TX',
    description:
      'We are seeking a talented UX/UI Designer to create amazing user experiences for our products.',
    url: '#',
  },
  {
    title: 'Product Manager',
    company: 'Future Forward',
    location: 'Boston, MA',
    description:
      'Lead the development of our new products from conception to launch.',
    url: '#',
  },
  {
    title: 'Full Stack Engineer',
    company: 'DevWorks',
    location: 'Seattle, WA',
    description: 'A passionate Full Stack Engineer to design, develop and install software solutions.',
    url: '#',
  }
];

// 1. Define the tool the AI can use to find jobs.
const findJobs = ai.defineTool(
  {
    name: 'findJobs',
    description: 'Search for job openings based on a query and optional location.',
    inputSchema: z.object({
      query: z.string().describe('The job title, keywords, or skills to search for.'),
      location: z.string().optional().describe('The city, state, or country to search in.'),
    }),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        location: z.string(),
        description: z.string(),
        url: z.string(),
      })
    ),
  },
  async (input) => {
    console.log(`Tool 'findJobs' called with query: "${input.query}"`);
    // In a real application, this would call a job board API.
    // For now, we'll return a filtered list from our mock data.
    const filteredJobs = MOCK_JOBS.filter(job => 
        job.title.toLowerCase().includes(input.query.toLowerCase()) ||
        job.description.toLowerCase().includes(input.query.toLowerCase())
    );
    return filteredJobs;
  }
);


// 2. Define the input and output schemas for the main flow.
export const FindJobsInputSchema = z.object({
  query: z.string(),
});
export type FindJobsInput = z.infer<typeof FindJobsInputSchema>;

export const FindJobsOutputSchema = z.object({
  jobs: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      description: z.string(),
      url: z.string(),
    })
  ).describe('A list of job openings that match the user query.'),
});
export type FindJobsOutput = z.infer<typeof FindJobsOutputSchema>;


/**
 * Public-facing function that can be called from Server Actions.
 * It invokes the Genkit flow to find jobs.
 */
export async function findJobs(
  input: FindJobsInput
): Promise<FindJobsOutput> {
  const result = await findJobsFlow(input);
  return { jobs: result.jobs || [] };
}


// 3. Define the prompt that tells the AI how to use the tool.
const prompt = ai.definePrompt({
  name: 'findJobsPrompt',
  input: {schema: FindJobsInputSchema},
  output: {schema: FindJobsOutputSchema},
  tools: [findJobs],
  prompt: `You are an AI assistant that helps users find job openings.
  
  Use the 'findJobs' tool to search for jobs based on the user's query: {{{query}}}

  Return the list of jobs found by the tool. If no jobs are found, return an empty list.
  Do not invent jobs. Only return jobs provided by the tool.`,
});


// 4. Define the Genkit flow that executes the prompt.
const findJobsFlow = ai.defineFlow(
  {
    name: 'findJobsFlow',
    inputSchema: FindJobsInputSchema,
    outputSchema: FindJobsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
