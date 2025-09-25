'use server';

/**
 * @fileOverview An AI agent that suggests the most likely job application status based on the application date and role.
 * This file defines a Genkit "flow", which is a server-side function that uses an AI model
 * to perform a specific task.
 *
 * This flow:
 * 1. Defines the expected input (`SuggestApplicationStatusInput`) and output (`SuggestApplicationStatusOutput`) schemas using Zod.
 * 2. Creates a prompt that instructs the AI model on how to behave.
 * 3. Defines the main flow (`suggestApplicationStatusFlow`) which orchestrates the call to the AI model.
 * 4. Exports a wrapper function (`suggestApplicationStatus`) to be used as a Server Action in the application.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Defines the schema for the input data required by the flow.
const SuggestApplicationStatusInputSchema = z.object({
  applicationDate: z
    .string()
    .describe('The date when the job application was submitted.'),
  jobRole: z.string().describe('The job role applied for.'),
});
export type SuggestApplicationStatusInput = z.infer<
  typeof SuggestApplicationStatusInputSchema
>;

// Defines the schema for the output data returned by the flow.
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

/**
 * Public-facing function that can be called from Server Actions.
 * It invokes the Genkit flow to get the status suggestion.
 */
export async function suggestApplicationStatus(
  input: SuggestApplicationStatusInput
): Promise<SuggestApplicationStatusOutput> {
  return suggestApplicationStatusFlow(input);
}

// Defines the AI prompt with instructions for the model.
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

// Defines the Genkit flow that executes the prompt.
const suggestApplicationStatusFlow = ai.defineFlow(
  {
    name: 'suggestApplicationStatusFlow',
    inputSchema: SuggestApplicationStatusInputSchema,
    outputSchema: SuggestApplicationStatusOutputSchema,
  },
  async input => {
    // Run the prompt with the given input.
    const {output} = await prompt(input);
    // Return the structured output from the model.
    return output!;
  }
);
