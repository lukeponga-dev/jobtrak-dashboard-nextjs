'use server';

/**
 * @fileOverview An AI agent that finds job openings based on a query.
 * This file defines a Genkit "flow" that uses an AI model and a custom tool
 * to simulate searching for job listings from various job boards.
 *
 * This flow:
 * 1. Defines a tool (`findJobsTool`) that returns a mock list of jobs from sources like Indeed, LinkedIn, Seek, and Trade Me.
 * 2. Defines the input (`FindJobsInput`) and output (`FindJobsOutput`) schemas.
 * 3. Creates a prompt instructing the AI to use the tool to answer user queries.
 * 4. Defines the main flow (`findJobsFlow`) that orchestrates the tool call.
 * 5. Exports a wrapper function to be used as a Server Action.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Mock data simulating job listings from different platforms.
const MOCK_JOBS = [
  {
    title: 'Senior Frontend Developer',
    company: 'LinkedIn',
    location: 'San Francisco, CA',
    url: 'https://www.linkedin.com/jobs/',
  },
  {
    title: 'Lead UX/UI Designer',
    company: 'Indeed',
    location: 'New York, NY',
    url: 'https://www.indeed.com/',
  },
  {
    title: 'Senior Product Manager',
    company: 'Seek',
    location: 'Auckland, NZ',
    url: 'https://www.seek.co.nz/',
  },
  {
    title: 'Principal Data Scientist',
    company: 'Trade Me',
    location: 'Wellington, NZ',
    url: 'https://www.trademe.co.nz/a/jobs',
  },
  {
    title: 'Full Stack Engineer',
    company: 'LinkedIn',
    location: 'Remote',
    url: 'https://www.linkedin.com/jobs/',
  },
  {
    title: 'Cloud DevOps Engineer',
    company: 'Indeed',
    location: 'Seattle, WA',
    url: 'https://www.indeed.com/',
  },
];

// 1. Define the tool that the AI can use to find jobs.
const findJobsTool = ai.defineTool(
  {
    name: 'findJobs',
    description:
      'Finds job openings from Indeed, LinkedIn, Seek, and Trade Me based on a search query.',
    inputSchema: z.object({
      query: z.string().describe('The job title or keywords to search for.'),
      location: z
        .string()
        .optional()
        .describe('The location to search for jobs in.'),
    }),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        location: z.string(),
        url: z.string(),
      })
    ),
  },
  async input => {
    // In a real app, you would use APIs for each job board.
    // For this demo, we'll return a filtered list of mock jobs.
    console.log(`Tool called with query: ${input.query}`);
    return MOCK_JOBS.filter(job =>
      job.title.toLowerCase().includes(input.query.toLowerCase())
    );
  }
);

// 2. Define the schema for the flow's input and output.
const FindJobsInputSchema = z.object({
  query: z.string(),
});
export type FindJobsInput = z.infer<typeof FindJobsInputSchema>;

const FindJobsOutputSchema = z.object({
  jobs: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      url: z.string(),
    })
  ),
});
export type FindJobsOutput = z.infer<typeof FindJobsOutputSchema>;


// 3. Define the AI prompt that instructs the model to use the tool.
const prompt = ai.definePrompt({
  name: 'jobFinderPrompt',
  input: {schema: FindJobsInputSchema},
  output: {schema: FindJobsOutputSchema},
  tools: [findJobsTool],
  prompt: `You are a helpful job search assistant. Use the available tools to find job listings that match the user's query from sources like Indeed, LinkedIn, Seek, and Trade Me.

  User Query: {{{query}}}
  
  Return the jobs you find. If no jobs are found, return an empty array.`,
});

// 4. Define the main Genkit flow.
const findJobsFlow = ai.defineFlow(
  {
    name: 'findJobsFlow',
    inputSchema: FindJobsInputSchema,
    outputSchema: FindJobsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


/**
 * 5. Public-facing function that can be called from Server Actions.
 * It invokes the Genkit flow to find jobs.
 */
export async function findJobs(
  input: FindJobsInput
): Promise<FindJobsOutput> {
  const result = await findJobsFlow(input);
  // Add a small delay to simulate network latency for a better UX demo
  await new Promise(resolve => setTimeout(resolve, 500));
  return result;
}
