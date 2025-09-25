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
  ).describe('A list of job openings that match the user query.'),
});
export type FindJobsOutput = z.infer<typeof FindJobsOutputSchema>;
