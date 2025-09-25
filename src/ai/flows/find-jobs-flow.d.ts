
import { z } from 'genkit';

// Define the input and output schemas for the main flow.
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
  ).describe('A list of job openings that match th')
  import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the findJobs AI flow.
 * This file contains the Zod schemas and TypeScript types for the inputs
 * and outputs of the job finder functionality. Separating types into their
 * own file is a requirement when using Genkit flows with Next.js Server Actions,
 * as the main flow file can only export async functions.
 */

// Schema for the flow's input.
export const FindJobsInputSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Remote', 'All']).optional(),
});
export type FindJobsInput = z.infer<typeof FindJobsInputSchema>;

// Schema for a single job.
export const JobSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  url: z.string(),
  source: z.string(),
  datePosted: z.string(),
  type: z.string(),
});
export type Job = z.infer<typeof JobSchema>;


// Schema for the flow's output.
export const FindJobsOutputSchema = z.object({
  jobs: z.array(JobSchema),

});
export type FindJobsOutput = z.infer<typeof FindJobsOutputSchema>;
