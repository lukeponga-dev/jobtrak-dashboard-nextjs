export type ApplicationStatus = "Applied" | "Interviewing" | "Offer" | "Rejected";

export interface JobApplication {
  id: number;
  user_id: string;
  company: string;
  role: string;
  date: string;
  status: ApplicationStatus;
  notes?: string;
}
