import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the `findJobsFlow`.
 * This file defines the TypeScript types and Zod schemas for the inputs and outputs
 * of the AI-powered job finder flow. Using a `.d.ts` file allows us to share
 * these types between server-side (Genkit flow) and client-side (React components) code
 * without bundling server code into the client application.
 */

// Zod schema for a single job object.
export const Job = z.object({
  title: z.string().describe('The job title.'),
  company: z.string().describe('The company name.'),
  location: z.string().describe('The job location (e.g., city, state, or "Remote").'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Remote']).describe('The type of employment.'),
  url: z.string().url().describe('The URL to the job posting.'),
  source: z.string().describe('The source of the job listing (e.g., "LinkedIn", "Company Careers").'),
  datePosted: z.string().datetime().describe('The date the job was posted in ISO 8601 format.'),
});
export type Job = z.infer<typeof Job>;


// Zod schema for the input to the findJobsFlow.
export const FindJobsInputSchema = z.object({
  query: z.string().describe('The search query (job title, keywords, company).'),
  location: z.string().optional().describe('The desired job location.'),
  type: z
    .enum(['All', 'Full-time', 'Part-time', 'Contract', 'Remote'])
    .optional()
    .describe('The type of employment.'),
});
export type FindJobsInput = z.infer<typeof FindJobsInputSchema>;


// Zod schema for the output of the findJobsFlow.
export const FindJobsOutputSchema = z.object({
  jobs: z.array(Job).describe('A list of jobs that match the criteria.'),
});
export type FindJobsOutput = z.infer<typeof FindJobsOutputSchema>;
