export type ApplicationStatus = "Applied" | "Interviewing" | "Offer" | "Rejected";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  date: string;
  status: ApplicationStatus;
}
