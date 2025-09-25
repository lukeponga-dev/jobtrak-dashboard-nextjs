'use server';

/**
 * @fileOverview An AI agent that generates helpful starter notes for a job application.
 *
 * - generateApplicationNotes - A function that generates starter notes.
 * - GenerateApplicationNotesInput - The input type for the generateApplicationNotes function.
 * - GenerateApplicationNotesOutput - The return type for the generateApplicationNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateApplicationNotesInputSchema = z.object({
  company: z.string().describe('The name of the company.'),
  role: z.string().describe('The job role being applied for.'),
});
export type GenerateApplicationNotesInput = z.infer<
  typeof GenerateApplicationNotesInputSchema
>;

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

export async function generateApplicationNotes(
  input: GenerateApplicationNotesInput
): Promise<GenerateApplicationNotesOutput> {
  return generateApplicationNotesFlow(input);
}

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

const generateApplicationNotesFlow = ai.defineFlow(
  {
    name: 'generateApplicationNotesFlow',
    inputSchema: GenerateApplicationNotesInputSchema,
    outputSchema: GenerateApplicationNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
