export const TWITCH_EVENT_TYPES = [
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
export type TwitchEventType = (typeof TWITCH_EVENT_TYPES)[number];

export interface TwitchMapping {
  id: string;
  twitchEventType: TwitchEventType;
  isActive: boolean;
  threshold: number;
  currentCount: number;
  showProgress: boolean;
  campaignId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedTwitchMapping extends TwitchMapping {
  event: {
    id: string;
    name: string;
  };
}

export interface CreateTwitchMappingPayload {
  twitchEventType: TwitchEventType;
  eventId: string;
  isActive?: boolean;
  threshold?: number;
  showProgress?: boolean;
}

export type UpdateTwitchMappingPayload = Partial<CreateTwitchMappingPayload>;
