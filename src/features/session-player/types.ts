export type PlayerParticipationStatus = "ACTIVE" | "LEFT" | "DIED";
export type CharacterStatus =
  | "OK"
  | "HURT"
  | "CRITICAL"
  | "UNCONSCIOUS"
  | "INSPIRED"
  | "POISONED"
  | "ASLEEP";

export interface SessionPlayerCharacter {
  id: string;
  joinedAt: string;
  leftAt: string | null;
  status: PlayerParticipationStatus;
  currentHp: number | null;
  charStatus: CharacterStatus;
  sessionId: string;
  playerCharacterId: string;
  playerCharacter: {
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
  };
}

export interface JoinSessionPayload {
  playerCharacterId: string;
}

export interface UpdateSessionPlayerCharacterPayload {
  currentHp?: number;
  charStatus?: CharacterStatus;
  status?: PlayerParticipationStatus;
}
