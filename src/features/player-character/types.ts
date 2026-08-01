export interface PlayerCharacter {
  id: string;
  name: string;
  class: string | null;
  level: number | null;
  maxHp: number | null;
  armorClass: number | null;
  avatarUrl: string | null;
  isAlive: boolean;
  displayAvatar: boolean;
  displayClass: boolean;
  displayLevel: boolean;
  displayHp: boolean;
  displayArmorClass: boolean;
  displayStatus: boolean;
  createdAt: string;
  updatedAt: string;
  campaignId: string;
}

export interface CreatePlayerCharacterPayload {
  name: string;
  class?: string;
  level?: number;
  maxHp?: number;
  armorClass?: number;
  avatarUrl?: string;
  isAlive?: boolean;
  displayAvatar?: boolean;
  displayClass?: boolean;
  displayLevel?: boolean;
  displayHp?: boolean;
  displayArmorClass?: boolean;
  displayStatus?: boolean;
  campaignId: string;
}

export type UpdatePlayerCharacterPayload = Partial<
  Omit<CreatePlayerCharacterPayload, "campaignId">
>;
