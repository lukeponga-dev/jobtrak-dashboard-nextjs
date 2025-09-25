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
  query: z.string(),
});
export type FindJobsInput = z.infer<typeof FindJobsInputSchema>;

// Schema for the flow's output.
export const FindJobsOutputSchema = z.object({
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
