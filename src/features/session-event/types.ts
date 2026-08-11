export type SessionEventStatus = "PENDING" | "VALIDATED" | "REJECTED";
export type SessionEventOrigin = "TWITCH" | "MANUAL" | "THRESHOLD";

export interface SessionEvent {
  id: string;
  status: SessionEventStatus;
  finalMessage: string | null;
  triggeredAt: string;
  resolvedAt: string | null;
  sessionId: string;
  eventId: string;
  chosenResolutionId: string | null;
  thresholdEventId: string | null;
  origin: SessionEventOrigin;
}

export interface CreateSessionEventPayload {
  eventId: string;
  origin: SessionEventOrigin;
}

export interface ValidateSessionEventPayload {
  chosenResolutionId?: string;
  finalMessage?: string;
}

export interface UpdateSessionEventPayload {
  eventId?: string;
  finalMessage?: string;
}
