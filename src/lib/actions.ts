
"use server";

import { revalidatePath } from "next/cache";
import { suggestApplicationStatus as suggestStatus } from "@/ai/flows/suggest-application-status";
import type { SuggestApplicationStatusInput } from "@/ai/flows/suggest-application-status";
import type { JobApplication, ApplicationStatus } from "./types";
import { createClient } from "./supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Could not authenticate user" };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full-name") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
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
    return { error: "Could not authenticate user" };
  }

  return { message: "Check email to continue sign up process" };
}


export async function signInWithGoogle() {
  // TODO: Re-implement Google Sign-In
  console.log("Google Sign-In not implemented");
  return null;
}


export async function suggestApplicationStatus(
  input: SuggestApplicationStatusInput
) {
  try {
    const result = await suggestStatus(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error suggesting application status:", error);
    return { success: false, error: "Failed to suggest status." };
  }
}

export async function addApplication(application: Omit<JobApplication, 'id'>) {
  const supabase = createClient();
   const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication error." };
  }

  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert([
        { ...application, user_id: user.id },
      ])
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath("/dashboard");
    return { success: true, data };
  } catch (error) {
    console.error("Error adding application:", error);
    return { success: false, error: "Failed to add application." };
  }
}

export async function updateApplicationStatus(input: {id: number, status: ApplicationStatus}) {
  const supabase = createClient();
  try {
     const { error } = await supabase
      .from('job_applications')
      .update({ status: input.status })
      .eq('id', input.id)

    if (error) throw error;
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteApplication(id: number) {
   const supabase = createClient();
  try {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting application:", error);
    return { success: false, error: "Failed to delete application." };
  }
}

export async function updateUser(formData: FormData) {
  const supabase = createClient();
  const fullName = formData.get("fullName") as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Authentication error." };
  }

  const { error } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  });

  if (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user information." };
  }
  
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard", "layout");
  return { success: true, message: "Your name has been updated successfully." };
}

export async function changePassword(formData: FormData) {
  const supabase = createClient();
  const newPassword = formData.get("newPassword") as string;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Authentication error." };
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    console.error("Error changing password:", error);
    return { success: false, error: "Failed to change password. Your new password must be at least 6 characters long." };
  }

  return { success: true, message: "Your password has been changed successfully." };
}
