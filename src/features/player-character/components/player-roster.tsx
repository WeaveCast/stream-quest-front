"use client";

import { usePlayerCharacters } from "../api/use-player-characters";
import { PlayerCard } from "@/components/ui/player-card";
import { Text } from "@/components/ui/typography";
import { PlayerCharacter } from "../types";

export function PlayerRoster({ campaignId }: { campaignId: string }) {
  const {
    data: characters,
    isLoading,
    isError,
  } = usePlayerCharacters(campaignId);

  if (isLoading) return <Text>Loading roster...</Text>;
  if (isError) return <Text>Failed to load player characters.</Text>;
  if (!characters || characters.length === 0) {
    return <Text>No player characters yet.</Text>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
      {characters.map((character: PlayerCharacter) => (
        <PlayerCard
          key={character.id}
          layout="vertical"
          character={{
            name: character.name,
            avatarUrl: character.avatarUrl,
            class: character.class,
            level: character.level,
            currentHp: null,
            maxHp: null,
            armorClass: character.armorClass,
            status: character.isAlive ? "ok" : "unconscious",
            displayAvatar: character.displayAvatar,
            displayClass: character.displayClass,
            displayLevel: character.displayLevel,
            displayHp: false,
            displayArmorClass: character.displayArmorClass,
            displayStatus: false,
          }}
        />
      ))}
    </div>
  );
}
