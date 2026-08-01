"use client";

import { useState } from "react";
import { usePlayerCharacters } from "../api/use-player-characters";
import { PlayerCharacterDetailDialog } from "./player-character-detail-dialog";
import { PlayerCard } from "@/components/ui/player-card";
import { Text } from "@/components/ui/typography";

export function PlayerRoster({ campaignId }: { campaignId: string }) {
  const {
    data: characters,
    isLoading,
    isError,
  } = usePlayerCharacters(campaignId);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <Text>Loading roster...</Text>;
  if (isError) return <Text>Failed to load player characters.</Text>;
  if (!characters || characters.length === 0) {
    return <Text>No player characters yet.</Text>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
      {characters.map((character) => (
        <button
          key={character.id}
          onClick={() => setSelectedId(character.id)}
          className="text-left"
        >
          <PlayerCard
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
        </button>
      ))}

      <PlayerCharacterDetailDialog
        key={selectedId}
        characterId={selectedId}
        campaignId={campaignId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
