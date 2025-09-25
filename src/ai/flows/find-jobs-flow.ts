'use server';

/**
 * @fileOverview An AI agent that finds job openings based on a query and filters.
 * This file defines a Genkit "flow" that uses an AI model and a custom tool
 * to simulate searching for job listings from various job boards.
 *
 * This flow:
 * 1. Defines a tool (`findJobsTool`) that returns a mock list of jobs from sources like Indeed, LinkedIn, Seek, and Trade Me.
 * 2. Imports the input (`FindJobsInput`) and output (`FindJobsOutput`) schemas from a separate types file.
 * 3. Creates a prompt instructing the AI to use the tool to answer user queries and apply filters.
 * 4. Defines the main flow (`findJobsFlow`) that orchestrates the tool call.
 * 5. Exports a wrapper function to be used
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  FindJobsInputSchema,
  FindJobsOutputSchema,
  type FindJobsInput,
  type FindJobsOutput,
} from './find-jobs-flow.d';
import { subDays } from 'date-fns';

// Mock data simulating job listings from different platforms.
const MOCK_JOBS = [
  {
    title: 'Senior Frontend Developer',
    company: 'LinkedIn',
    location: 'San Francisco, CA',
    url: 'https://www.linkedin.com/jobs/',
    source: 'LinkedIn',
    datePosted: subDays(new Date(), 2).toISOString(),
    type: 'Full-time'
  },
  {
    title: 'Lead UX/UI Designer',
    company: 'Indeed',
    location: 'New York, NY',
    url: 'https://www.indeed.com/',
    source: 'Indeed',
    datePosted: subDays(new Date(), 5).toISOString(),
    type: 'Full-time'
  },
  {
    title: 'Senior Product Manager',
    company: 'Seek',
    location: 'Auckland, NZ',
    url: 'https://www.seek.co.nz/',
    source: 'Seek',
    datePosted: subDays(new Date(), 1).toISOString(),
    type: 'Full-time'
  },
  {
    title: 'Principal Data Scientist',
    company: 'Trade Me',
    location: 'Wellington, NZ',
    url: 'https://www.trademe.co.nz/a/jobs',
    source: 'Trade Me',
    datePosted: subDays(new Date(), 10).toISOString(),
    type: 'Contract'
  },
  {
    title: 'Full Stack Engineer',
    company: 'Google',
    location: 'Remote',
    url: 'https://careers.google.com/',
    source: 'Google Careers',
    datePosted: subDays(new Date(), 3).toISOString(),
    type: 'Remote'
  },
  {
    title: 'Cloud DevOps Engineer',
    company: 'Amazon Web Services',
    location: 'Seattle, WA',
    url: 'https://www.amazon.jobs/',
    source: 'Amazon Jobs',
    datePosted: subDays(new Date(), 7).toISOString(),
    type: 'Full-time'
  },
   {
    title: 'Junior Web Developer',
    company: 'Webflow',
    location: 'Remote',
    url: 'https://webflow.com/jobs',
    source: 'Webflow',
    datePosted: subDays(new Date(), 4).toISOString(),
    type: 'Part-time'
  },
  {
    title: 'Marketing Coordinator',
    company: 'HubSpot',
    location: 'Auckland, NZ',
    url: 'https://www.hubspot.com/careers',
    source: 'HubSpot',
    datePosted: subDays(new Date(), 12).toISOString(),
    type: 'Full-time'
  }
];

// 1. Define the tool that the AI can use to find jobs.
const findJobsTool = ai.defineTool(
  {
    name: 'findJobs',
    description:
      'Finds job openings from Indeed, LinkedIn, Seek, Trade Me, and other sources based on a search query and filters.',
    inputSchema: z.object({
      query: z.string().optional().describe('The job title or keywords to search for.'),
      location: z
        .string()
        .optional()
        .describe('The location to search for jobs in.'),
      type: z.enum(['Full-time', 'Part-time', 'Contract', 'Remote', 'All']).optional().describe('The type of job.'),

    }),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        location: z.string(),
        url: z.string(),
        source: z.string(),
        datePosted: z.string(),
        type: z.string(),
      })
    ),
  },
  async input => {
    console.log(`Tool called with input: ${JSON.stringify(input)}`);
    let jobs = MOCK_JOBS;

    if (input.query) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(input.query!.toLowerCase()) ||
        job.company.toLowerCase().includes(input.query!.toLowerCase())
      );
    }
    if (input.location) {
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(input.location!.toLowerCase())
      );
    }
    if (input.type && input.type !== 'All') {
      jobs = jobs.filter(job =>
        job.type === input.type
      );
    }
    
    return jobs;
  }
);

// 2. Define the AI prompt that instructs the model to use the tool.
const prompt = ai.definePrompt({
  name: 'jobFinderPrompt',
  input: {schema: FindJobsInputSchema},
  output: {schema: FindJobsOutputSchema},
  tools: [findJobsTool],
  prompt: `You are a helpful job search assistant. Use the available tools to find job listings that match the user's query and filters from sources like Indeed, LinkedIn, Seek, and Trade Me.

  User Query: {{{query}}}
  User Location: {{{location}}}
  User Job Type: {{{type}}}
  
  Return the jobs you find. If no jobs are found, return an empty array.`,
});

// 3. Define the main Genkit flow.
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
 * 4. Public-facing function that can be called from Server Actions.
 * It invokes the Genkit flow to find jobs.
 */
export async function findJobs(
  input: FindJobsInput
): Promise<FindJobsOutput> {
  const result = await findJobsFlow(input);
  // Add a small delay to simulate network latency for a better UX demo
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    jobs: result.jobs.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
  };
}
