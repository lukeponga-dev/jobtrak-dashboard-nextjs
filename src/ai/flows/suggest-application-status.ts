'use server';

/**
 * @fileOverview An AI agent that suggests the most likely job application status based on the application date and role.
 *
 * - suggestApplicationStatus - A function that suggests the application status.
 * - SuggestApplicationStatusInput - The input type for the suggestApplicationStatus function.
 * - SuggestApplicationStatusOutput - The return type for the suggestApplicationStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestApplicationStatusInputSchema = z.object({
  applicationDate: z
    .string()
    .describe('The date when the job application was submitted.'),
  jobRole: z.string().describe('The job role applied for.'),
});
export type SuggestApplicationStatusInput = z.infer<
  typeof SuggestApplicationStatusInputSchema
>;

const SuggestApplicationStatusOutputSchema = z.object({
  suggestedStatus: z
    .enum(['Applied', 'Interviewing', 'Offer', 'Rejected'])
    .describe(
      'The suggested application status based on the application date and role.'
    ),
});
export type SuggestApplicationStatusOutput = z.infer<
  typeof SuggestApplicationStatusOutputSchema
>;

export async function suggestApplicationStatus(
  input: SuggestApplicationStatusInput
): Promise<SuggestApplicationStatusOutput> {
  return suggestApplicationStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestApplicationStatusPrompt',
  input: {schema: SuggestApplicationStatusInputSchema},
  output: {schema: SuggestApplicationStatusOutputSchema},
  prompt: `You are an AI assistant specialized in predicting job application statuses.

  Given the application date and the job role, suggest the most likely current status of the application.

  Here is the information:
  Application Date: {{{applicationDate}}}
  Job Role: {{{jobRole}}}

  Possible statuses are: Applied, Interviewing, Offer, Rejected.
  Return the suggested status.`,
});

const suggestApplicationStatusFlow = ai.defineFlow(
  {
    name: 'suggestApplicationStatusFlow',
    inputSchema: SuggestApplicationStatusInputSchema,
    outputSchema: SuggestApplicationStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
