/**
 * @file This file initializes and configures the Genkit AI toolkit.
 * It sets up the Google AI plugin, which allows the application to use Google's
 * generative AI models (like Gemini). The exported `ai` object is used throughout
 * the application to define and run AI flows.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin.
export const ai = genkit({
  plugins: [
    // The Google AI plugin provides access to Gemini models.
    // It automatically uses the GEMINI_API_KEY from the environment variables.
    googleAI(),
  ],
  // Specify the default model to be used for generation tasks.
  model: 'googleai/gemini-2.5-flash',
});
