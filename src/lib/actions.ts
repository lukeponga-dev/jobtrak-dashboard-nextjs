"use server";

import { suggestApplicationStatus as suggestStatus } from "@/ai/flows/suggest-application-status";
import type { SuggestApplicationStatusInput } from "@/ai/flows/suggest-application-status";

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
