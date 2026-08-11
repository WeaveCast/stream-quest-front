export const TIME_OF_DAY = ["DAWN", "DAY", "DUSK", "NIGHT"] as const;
export type TimeOfDay = (typeof TIME_OF_DAY)[number];

export interface ContextSnapshot {
  id: string;
  timeOfDay: TimeOfDay | null;
  weatherId: string | null;
  locationId: string | null;
  snapshotAt: string;
  sessionId: string;
}

export interface UpdateContextSnapshotPayload {
  weatherId?: string;
  locationId?: string;
  timeOfDay?: TimeOfDay;
}
