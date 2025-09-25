
'use server';

import {revalidatePath} from 'next/cache';
import {suggestApplicationStatus as suggestStatus} from '@/ai/flows/suggest-application-status';
import {generateApplicationNotes as genNotes} from '@/ai/flows/generate-application-notes.ts';

import type {SuggestApplicationStatusInput} from '@/ai/flows/suggest-application-status';
import type {GenerateApplicationNotesInput} from '@/ai/flows/generate-application-notes.ts';

import type {JobApplication, ApplicationStatus} from './types';
import {createClient} from './supabase/server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/dashboard');
}

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

export async function getGoogleOauthUrl() {
  const origin = headers().get('origin');
  const supabase = createClient();
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error getting Google OAuth URL:', error);
    return { error: 'Could not get Google OAuth URL' };
  }
  
  if (data.url) {
    redirect(data.url);
  }

  return { error: 'Could not get Google OAuth URL' };
}


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

export async function addApplication(
  application: Omit<JobApplication, 'id' | 'user_id'>
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


export async function sendSupportEmail(formData: FormData) {
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const email = 'developmentdesignsltd@gmail.com';

  if (!subject || !message) {
    return { success: false, error: 'Subject and message are required.' };
  }

  try {
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    return { success: true, mailto };
  } catch (error) {
    console.error('Error creating mailto link:', error);
    return { success: false, error: 'Could not create email link.' };
  }
}
