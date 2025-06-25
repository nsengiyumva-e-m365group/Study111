export interface Candidate {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  status: CandidateStatus;
  skills: string[];
}

export interface CandidateWithSelection extends Candidate {
  selected?: boolean;
}

export type CandidateStatus = "no-cv-found" | "active" | "pending" | "rejected";

export interface CandidateStatusInfo {
  label: string;
  variant: "destructive" | "success" | "warning" | "default";
}

export const statusMap: Record<CandidateStatus, CandidateStatusInfo> = {
  "no-cv-found": {
    label: "No CV Found!",
    variant: "destructive",
  },
  active: {
    label: "Active",
    variant: "success",
  },
  pending: {
    label: "Pending",
    variant: "warning",
  },
  rejected: {
    label: "Rejected",
    variant: "default",
  },
};
