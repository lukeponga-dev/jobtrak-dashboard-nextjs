'use server';

/**
 * @fileOverview An AI agent that generates helpful starter notes for a job application.
 * This file defines a Genkit "flow" that uses an AI model to generate actionable advice
 * for a job applicant based on the company and role they are applying for.
 *
 * This flow:
 * 1. Defines the input (`GenerateApplicationNotesInput`) and output (`GenerateApplicationNotesOutput`) schemas.
 * 2. Creates a prompt instructing the AI to act as a career coach.
 * 3. Defines the main flow (`generateApplicationNotesFlow`) that calls the AI.
 * 4. Exports a wrapper function (`generateApplicationNotes`) to be used as a Server Action.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Defines the schema for the input data.
const GenerateApplicationNotesInputSchema = z.object({
  company: z.string().describe('The name of the company.'),
  role: z.string().describe('The job role being applied for.'),
});
export type GenerateApplicationNotesInput = z.infer<
  typeof GenerateApplicationNotesInputSchema
>;

// Defines the schema for the output data.
const GenerateApplicationNotesOutputSchema = z.object({
  suggestedNotes: z
    .string()
    .describe(
      'A few helpful, actionable bullet points for a job applicant to consider.'
    ),
});
export type GenerateApplicationNotesOutput = z.infer<
  typeof GenerateApplicationNotesOutputSchema
>;

/**
 * Public-facing function that can be called from Server Actions.
 * It invokes the Genkit flow to generate application notes.
 */
export async function generateApplicationNotes(
  input: GenerateApplicationNotesInput
): Promise<GenerateApplicationNotesOutput> {
  return generateApplicationNotesFlow(input);
}

// Defines the AI prompt with instructions for the model.
const prompt = ai.definePrompt({
  name: 'generateApplicationNotesPrompt',
  input: {schema: GenerateApplicationNotesInputSchema},
  output: {schema: GenerateApplicationNotesOutputSchema},
  prompt: `You are an expert career coach. A user is applying for a job and needs some initial notes on how to best prepare.

  Generate 2-3 brief, actionable bullet points to help them get started.

  Here is the information:
  Company: {{{company}}}
  Job Role: {{{role}}}

  Example Output:
  - Research {{company}}'s recent projects and company values.
  - Tailor resume to highlight skills relevant to the {{role}} position.
  - Prepare 3-4 questions to ask the interviewer about the team and challenges.

  Return the notes as a single string with bullet points.`,
});

// Defines the Genkit flow that executes the prompt.
const generateApplicationNotesFlow = ai.defineFlow(
  {
    name: 'generateApplicationNotesFlow',
    inputSchema: GenerateApplicationNotesInputSchema,
    outputSchema: GenerateApplicationNotesOutputSchema,
  },
  async input => {
    // Run the prompt with the given input.
    const {output} = await prompt(input);
    // Return the structured output from the model.
    return output!;
  }
);
