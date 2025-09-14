"use server";

import { suggestApplicationStatus as suggestStatus } from "@/ai/flows/suggest-application-status";
import type { SuggestApplicationStatusInput } from "@/ai/flows/suggest-application-status";
import type { JobApplication, ApplicationStatus } from "./types";
import sql from "./db";

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

// This is a placeholder for when auth is implemented.
const FAKE_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function addApplication(application: Omit<JobApplication, 'id'>) {
  try {
    const [newApplication] = await sql<JobApplication[]>`
      INSERT INTO job_applications (user_id, company, role, date, status, notes)
      VALUES (${FAKE_USER_ID}, ${application.company}, ${application.role}, ${application.date}, ${application.status}, ${application.notes})
      RETURNING id, company, role, date, status, notes
    `;
    return { success: true, data: newApplication };
  } catch (error) {
    console.error("Error adding application:", error);
    return { success: false, error: "Failed to add application." };
  }
}

export async function updateApplicationStatus(input: {id: number, status: ApplicationStatus}) {
  try {
    await sql`
      UPDATE job_applications
      SET status = ${input.status}
      WHERE id = ${input.id} AND user_id = ${FAKE_USER_ID}
    `;
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteApplication(id: number) {
  try {
    await sql`
      DELETE FROM job_applications
      WHERE id = ${id} AND user_id = ${FAKE_USER_ID}
    `;
    return { success: true };
  } catch (error) {
    console.error("Error deleting application:", error);
    return { success: false, error: "Failed to delete application." };
  }
}
