/**
 * @file This file contains all the server-side actions for the application.
 * Server Actions are asynchronous functions that run on the server and can be called
 * directly from client components, making it easy to handle form submissions and data mutations.
 * They are a key feature of the Next.js App Router.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
'use server';

import {revalidatePath} from 'next/cache';
import {suggestApplicationStatus as suggestStatus} from '@/ai/flows/suggest-application-status';
import {generateApplicationNotes as genNotes} from '@/ai/flows/generate-application-notes.ts';
import { findJobs as findJobsFlow } from '@/ai/flows/find-jobs-flow';

import type {SuggestApplicationStatusInput} from '@/ai/flows/suggest-application-status';
import type {GenerateApplicationNotesInput} from '@/ai/flows/generate-application-notes.ts';
import type { FindJobsInput } from '@/ai/flows/find-jobs-flow.d';

import type {JobApplication, ApplicationStatus} from './types';
import {createClient} from './supabase/server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';

/**
 * Handles user sign-in using email and password with Supabase.
 * @param formData - The form data containing the user's email and password.
 * @returns An object indicating success or failure, with an error message if applicable.
 */
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: 'Could not authenticate user.' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

/**
 * Handles new user sign-up with Supabase.
 * @param formData - The form data containing the user's full name, email, and password.
 * @returns A redirect to the login page with a confirmation message or to the signup page with an error.
 */
export async function signUp(formData: FormData) {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full-name') as string;
  const supabase = createClient();

  const {error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return redirect('/signup?message=Could not authenticate user');
  }

  return redirect('/login?message=Check email to continue sign up process');
}

/**
 * Initiates the Google OAuth sign-in flow with Supabase.
 * @returns An object with the OAuth URL on success, or an error message on failure.
 */
export async function getGoogleOauthUrl() {
  const origin = headers().get('origin');
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error getting Google OAuth URL:', error);
    return { success: false, error: 'Could not get Google OAuth URL' };
  }

  if (data.url) {
    return { success: true, url: data.url };
  }

  return { success: false, error: 'Could not get Google OAuth URL' };
}

/**
 * Calls the Genkit AI flow to suggest a job application status.
 * @param input - The input data for the AI flow, including job role and application date.
 * @returns The suggested status from the AI or an error.
 */
export async function suggestApplicationStatus(
  input: SuggestApplicationStatusInput
) {
  try {
    const result = await suggestStatus(input);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error suggesting application status:', error);
    return {success: false, error: 'Failed to suggest status.'};
  }
}

/**
 * Calls the Genkit AI flow to generate starter notes for a job application.
 * @param input - The input data for the AI flow, including company and role.
 * @returns The generated notes from the AI or an error.
 */
export async function generateApplicationNotes(
  input: GenerateApplicationNotesInput
) {
  try {
    const result = await genNotes(input);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error generating application notes:', error);
    return {success: false, error: 'Failed to generate notes.'};
  }
}


/**
 * Calls the Genkit AI flow to find job openings.
 * @param input - The input for the AI flow, including the search query.
 * @returns A list of found jobs or an error.
 */
export async function findJobs(input: FindJobsInput) {
  try {
    const result = await findJobsFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error finding jobs:', error);
    return { success: false, error: 'Failed to find jobs.' };
  }
}

/**
 * Adds a new job application to the database for the currently authenticated user.
 * @param application - The job application data to add.
 * @returns The newly created application data on success, or an error.
 */
export async function addApplication(
  application: Omit<JobApplication, 'id'>
) {
  const supabase = createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return {success: false, error: 'Authentication error.'};
  }

  try {
    const {data, error} = await supabase
      .from('job_applications')
      .insert([
        {
          ...application,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/dashboard');
    return {success: true, data};
  } catch (error) {
    console.error('Error adding application:', error);
    return {success: false, error: 'Failed to add application.'};
  }
}

/**
 * Updates an existing job application in the database.
 * @param application - The job application data to update.
 * @returns The updated application data on success, or an error.
 */
export async function updateApplication(
  application: Omit<JobApplication, 'user_id'>
) {
  const supabase = createClient();
  try {
    const {data, error} = await supabase
      .from('job_applications')
      .update({
        company: application.company,
        role: application.role,
        status: application.status,
        notes: application.notes,
        date: application.date,
      })
      .eq('id', application.id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/dashboard');
    return {success: true, data};
  } catch (error) {
    console.error('Error updating application:', error);
    return {success: false, error: 'Failed to update application.'};
  }
}

/**
 * Updates only the status of a specific job application.
 * @param input - An object containing the application ID and the new status.
 * @returns An object indicating success or failure.
 */
export async function updateApplicationStatus(input: {
  id: number;
  status: ApplicationStatus;
}) {
  const supabase = createClient();
  try {
    const {error} = await supabase
      .from('job_applications')
      .update({status: input.status})
      .eq('id', input.id);

    if (error) throw error;

    revalidatePath('/dashboard');
    return {success: true};
  } catch (error) {
    console.error('Error updating status:', error);
    return {success: false, error: 'Failed to update status.'};
  }
}

/**
 * Deletes a job application from the database.
 * @param id - The ID of the application to delete.
 * @returns An object indicating success or failure.
 */
export async function deleteApplication(id: number) {
  const supabase = createClient();
  try {
    const {error} = await supabase.from('job_applications').delete().eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard');
    return {success: true};
  } catch (error) {
    console.error('Error deleting application:', error);
    return {success: false, error: 'Failed to delete application.'};
  }
}

/**
 * Updates the full name of the currently authenticated user.
 * @param formData - The form data containing the new full name.
 * @returns A success message or an error message.
 */
export async function updateUser(formData: FormData) {
  const supabase = createClient();
  const fullName = formData.get('fullName') as string;

  const {
    data: {user},
  } = await supabase.auth.getUser();
  if (!user) {
    return {success: false, error: 'Authentication error.'};
  }

  const {error} = await supabase.auth.updateUser({
    data: {full_name: fullName},
  });

  if (error) {
    console.error('Error updating user:', error);
    return {success: false, error: 'Failed to update user information.'};
  }

  revalidatePath('/dashboard/settings');
  revalidatePath('/dashboard', 'layout');
  return {success: true, message: 'Your name has been updated successfully.'};
}

/**
 * Changes the password for the currently authenticated user.
 * @param formData - The form data containing the new password.
 * @returns A success message or an error message.
 */
export async function changePassword(formData: FormData) {
  const supabase = createClient();
  const newPassword = formData.get('newPassword') as string;

  const {
    data: {user},
  } = await supabase.auth.getUser();
  if (!user) {
    return {success: false, error: 'Authentication error.'};
  }

  const {error} = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      error:
        'Failed to change password. Your new password must be at least 6 characters long.',
    };
  }

  return {
    success: true,
    message: 'Your password has been changed successfully.',
  };
}

/**
 * Simulates sending a support email. In a real application, this would integrate
 * with an email service like Resend or Nodemailer.
 * @param formData - The form data containing the subject and message.
 * @returns A success message or an error message.
 */
export async function sendSupportEmail(formData: FormData) {
  // This is a placeholder. In a real app, you'd use a service like Resend or Nodemailer.
  const subject = formData.get('subject');
  const message = formData.get('message');
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'You must be logged in to send a support email.' };
  }

  console.log('--- Support Email ---');
  console.log('From:', user.email);
  console.log('Subject:', subject);
  console.log('Message:', message);
  console.log('---------------------');

  // Simulate an async operation
  await new Promise(res => setTimeout(res, 500));

  return { success: true, message: 'Your support request has been sent.' };
}
