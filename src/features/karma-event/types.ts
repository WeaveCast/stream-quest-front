export interface KarmaEvent {
  id: string;
  value: number;
  reason: string | null;
  occurredAt: string;
  campaignId: string;
  sessionId: string | null;
}
