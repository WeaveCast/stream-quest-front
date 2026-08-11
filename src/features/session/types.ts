export const SESSION_STATUSES = ["PLANNED", "LIVE", "ENDED"] as const;
export type SessionStatus = (typeof SESSION_STATUSES)[number];

export interface Session {
  id: string;
  title: string;
  description: string | null;
  status: SessionStatus;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
  campaignId: string;
  _count?: {
    sessionEvents: number;
    sessionPlayers: number;
    karmaEvents: number;
  };
}

export interface CreateSessionPayload {
  title: string;
  description?: string;
  campaignId: string;
}

export type UpdateSessionPayload = Partial<
  Pick<CreateSessionPayload, "title" | "description">
>;
