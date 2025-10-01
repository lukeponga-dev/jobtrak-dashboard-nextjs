'use server';
/**
 * @fileOverview An AI agent that finds relevant job listings based on user queries.
 * This file defines a Genkit flow that uses a tool-calling model to search a mock job database.
 *
 * This flow:
 * 1. Defines a tool (`findJobsTool`) that simulates searching for jobs.
 * 2. Defines the input (`FindJobsInput`) and output (`FindJobsOutput`) schemas.
 * 3. Creates a prompt that instructs the AI to use the tool to answer user queries.
 * 4. Defines the main flow (`findJobsFlow`) that executes the prompt with the tool.
 * 5. Exports a wrapper function (`findJobs`) to be used as a Server Action.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {FindJobsInput, FindJobsOutput} from './find-jobs-flow.d';
import {Job, FindJobsInputSchema, FindJobsOutputSchema} from './find-jobs-flow.d';

// Mock database of job listings.
const mockJobs: Job[] = [
    { title: "Frontend Developer", company: "Innovatech", location: "New York, NY", type: "Full-time", source: "Innovatech Careers", url: "#", datePosted: "2024-05-20T10:00:00Z" },
    { title: "Backend Engineer", company: "DataCorp", location: "San Francisco, CA", type: "Full-time", source: "DataCorp Careers", url: "#", datePosted: "2024-05-19T14:30:00Z" },
    { title: "UX Designer", company: "Creative Solutions", location: "Remote", type: "Contract", source: "Creative Solutions Careers", url: "#", datePosted: "2024-05-21T09:00:00Z" },
    { title: "Product Manager", company: "Innovatech", location: "New York, NY", type: "Full-time", source: "Innovatech Careers", url: "#", datePosted: "2024-05-18T11:00:00Z" },
    { title: "DevOps Engineer", company: "SecureCloud", location: "Austin, TX", type: "Full-time", source: "SecureCloud Careers", url: "#", datePosted: "2024-05-22T16:00:00Z" },
    { title: "Data Scientist", company: "DataCorp", location: "Remote", type: "Full-time", source: "DataCorp Careers", url: "#", datePosted: "2024-05-17T13:00:00Z" },
    { title: "Marketing Specialist", company: "GrowthHackers", location: "Los Angeles, CA", type: "Part-time", source: "GrowthHackers Careers", url: "#", datePosted: "2024-05-21T12:00:00Z" },
    { title: "Junior Web Developer", company: "WebWeavers", location: "Remote", type: "Contract", source: "WebWeavers Careers", url: "#", datePosted: "2024-05-20T18:00:00Z" },
    { title: "Senior UI Engineer", company: "PixelPerfect", location: "San Francisco, CA", type: "Full-time", source: "PixelPerfect Careers", url: "#", datePosted: "2024-05-15T09:30:00Z" },
    { title: "Cloud Architect", company: "SecureCloud", location: "Remote", type: "Full-time", source: "SecureCloud Careers", url: "#", datePosted: "2024-05-23T10:00:00Z" },
];


/**
 * Defines a tool that the AI can use to search for jobs in our mock database.
 * The model will decide when to call this tool based on the user's prompt.
 */
const findJobsTool = ai.defineTool(
  {
    name: 'findJobsTool',
    description: 'Searches for job listings based on query, location, and type.',
    inputSchema: z.object({
        query: z.string().optional().describe("Keywords for job title or company."),
        location: z.string().optional().describe("The desired job location (e.g., city, 'Remote')."),
        type: z.enum(['All', 'Full-time', 'Part-time', 'Contract', 'Remote']).optional().describe("The type of employment.")
    }),
    outputSchema: z.array(Job),
  },
  async (input) => {
    console.log(`[findJobsTool] Searching with input:`, input);
    let results = mockJobs;

    if (input.query) {
      const queryLower = input.query.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(queryLower) || 
        job.company.toLowerCase().includes(queryLower)
      );
    }
    if (input.location) {
      const locationLower = input.location.toLowerCase();
      results = results.filter(job => job.location.toLowerCase().includes(locationLower));
    }
    if (input.type && input.type !== 'All') {
       if (input.type === 'Remote') {
         results = results.filter(job => job.location.toLowerCase() === 'remote');
       } else {
         results = results.filter(job => job.type === input.type);
       }
    }
    
    // Sort by most recent date
    results.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());

    return results.slice(0, 15); // Return a max of 15 results
  }
);

/**
 * Public-facing function to be used as a Server Action.
 * It invokes the Genkit flow to find jobs.
 */
export async function findJobs(input: FindJobsInput): Promise<FindJobsOutput> {
  return findJobsFlow(input);
}

// Defines the AI prompt instructing the model on how to use the tool.
const prompt = ai.definePrompt({
  name: 'findJobsPrompt',
  input: { schema: FindJobsInputSchema },
  output: { schema: FindJobsOutputSchema },
  tools: [findJobsTool],
  prompt: `You are a helpful job search assistant.
  The user will provide you with search criteria for jobs.
  Use the findJobsTool to find jobs that match the user's criteria.
  
  User Query: {{{query}}}
  Location: {{{location}}}
  Job Type: {{{type}}}

  If the user provides a query, use it. If they provide a location, use it. If they provide a job type, use it.
  Call the tool with the appropriate parameters based on the user's input.
  Return the jobs you find. If no jobs are found, return an empty array.
  `,
});

// Defines the Genkit flow that executes the prompt.
const findJobsFlow = ai.defineFlow(
  {
    name: 'findJobsFlow',
    inputSchema: FindJobsInputSchema,
    outputSchema: FindJobsOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const toolResponse = llmResponse.toolRequest?.tool?.output as Job[] | undefined;

    if (toolResponse) {
        return { jobs: toolResponse };
    }
    
    // If the model didn't use the tool but returned structured data, use that.
    const output = llmResponse.output;
    if (output?.jobs) {
        return output;
    }
    
    // Fallback in case the model doesn't behave as expected.
    return { jobs: [] };
  }
);
