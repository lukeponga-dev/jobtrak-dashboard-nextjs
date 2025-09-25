'use server';

/**
 * @fileOverview An AI agent that finds job openings based on a query.
 * This file defines a Genkit "flow" that uses an AI model and a custom tool
 * to simulate searching for job listings.
 *
 * This flow:
 * 1. Defines a tool (`findJobs`) that returns a mock list of jobs.
 * 2. Defines the input (`FindJobsInput`) and output (`FindJobsOutput`) schemas.
 * 3. Creates a prompt instructing the AI to use the tool to answer user queries.
 * 4. Defines the main flow (`findJobsFlow`) that orchestrates the tool call.
 * 5. Exports a wrapper function to be used as a Server Action.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Mock data for job listings. In a real application, this would come from an API.
const MOCK_JOBS = [
  {
    title: 'Frontend Developer',
    company: 'Innovatech',
    location: 'San Francisco, CA',
    url: '#',
  },
  {
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    location: 'New York, NY',
    url: '#',
  },
  {
    title: 'Product Manager',
    company: 'Future Gadgets',
    location: 'Austin, TX',
    url: '#',
  },
  {
    title: 'Data Scientist',
    company: 'Data Insights Inc.',
    location: 'Boston, MA',
    url: '#',
  },
  {
    title: 'Backend Engineer',
    company: 'Server Systems',
    location: 'Remote',
    url: '#',
  },
  {
    title: 'DevOps Engineer',
    company: 'Cloud Co',
    location: 'Seattle, WA',
    url: '#',
  },
];

// 1. Define the tool that the AI can use to find jobs.
const findJobsTool = ai.defineTool(
  {
    name: 'findJobs',
    description: 'Finds job openings based on a search query.',
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
    // In a real app, you would use an API like the Google Jobs API.
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
  prompt: `You are a helpful job search assistant. Use the available tools to find job listings that match the user's query.

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
