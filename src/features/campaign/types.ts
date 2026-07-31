export type CampaignStatus = "ACTIVE" | "PAUSED" | "ENDED";
export type CampaignConclusion = "VICTORY" | "DEFEAT" | "ABANDONNED" | null;

export interface Campaign {
  id: string;
  title: string;
  description: string | null;
  status: CampaignStatus;
  conclusion: CampaignConclusion;
  karmaValue: number;
  chaosThreshold: number;
  blessingThreshold: number;
  gameMasterId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    sessions: number;
    campaignEvents: number;
  };
}

export interface CreateCampaignPayload {
  title: string;
  description?: string;
  chaosThreshold: number;
  blessingThreshold: number;
  overlayTheme?: Record<string, unknown>;
}

export interface UpdateCampaignPayload {
  title?: string;
  description?: string;
  chaosThreshold?: number;
  blessingThreshold?: number;
  overlayTheme?: Record<string, unknown>;
}

export interface UpdateCampaignStatusPayload {
  status: CampaignStatus;
  conclusion?: CampaignConclusion;
}
