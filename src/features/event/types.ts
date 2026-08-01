export const RESOLUTION_MODES = ["RANDOM", "MJ_CHOICE", "VIEWER_VOTE"] as const;
export type ResolutionMode = (typeof RESOLUTION_MODES)[number];

export const TRIGGER_TYPES = [
  "SUB_TIER1",
  "SUB_TIER2",
  "SUB_TIER3",
  "SUB_PRIME",
  "GIFT_SUB",
  "BITS",
  "RAID",
  "FOLLOW",
  "CHAT_COMMAND",
] as const;
export type TriggerType = (typeof TRIGGER_TYPES)[number];

export interface Event {
  id: string;
  name: string;
  karmaValue: number;
  isTemplate: boolean;
  isPublic: boolean;
  resolutionMode: ResolutionMode;
  eventTypeId: string;
  gameMasterId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  name: string;
  eventTypeId: string;
  karmaValue?: number;
  isTemplate?: boolean;
  isPublic?: boolean;
  resolutionMode?: ResolutionMode;
}

export interface Rule {
  id: string;
  triggerType: string;
  config: Record<string, unknown>;
  cooldown: number;
  isActive: boolean;
}

export interface Resolution {
  id: string;
  message: string | null;
  isFallback: boolean;
}

export interface DetailedEvent extends Event {
  rules: Rule[];
  resolutions: Resolution[];
}
