"use client";

import { useState } from "react";
import { useSessionPlayers } from "../api/use-session-players";
import { useJoinSession } from "../api/use-join-session";
import { usePlayerCharacters } from "@/features/player-character";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { PlayerCard } from "@/components/ui/player-card";
import { Text } from "@/components/ui/typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const charStatusToRing = {
  OK: "ok",
  HURT: "hurt",
  CRITICAL: "critical",
  UNCONSCIOUS: "unconscious",
  INSPIRED: "ok",
  POISONED: "hurt",
  ASLEEP: "unconscious",
} as const;

export function SessionPlayersPanel({
  sessionId,
  campaignId,
}: {
  sessionId: string;
  campaignId: string;
}) {
  const { data: sessionPlayers, isLoading } = useSessionPlayers(sessionId);
  const { data: allCharacters } = usePlayerCharacters(campaignId);
  const joinSession = useJoinSession(sessionId);
  const [selectedCharacterId, setSelectedCharacterId] = useState("");

  const joinedIds = new Set(sessionPlayers?.map((sp) => sp.playerCharacterId));
  const availableCharacters =
    allCharacters?.filter((c) => !joinedIds.has(c.id)) ?? [];

  return (
    <Card>
      <div className="flex items-center justify-between mb-sm">
        <CardTitle className="mb-0">Players</CardTitle>
        {availableCharacters.length > 0 && (
          <div className="flex items-center gap-xs">
            <Select
              value={selectedCharacterId}
              onValueChange={setSelectedCharacterId}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Add character..." />
              </SelectTrigger>
              <SelectContent>
                {availableCharacters.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="small"
              variant="secondary"
              disabled={!selectedCharacterId || joinSession.isPending}
              onClick={() => {
                joinSession.mutate({ playerCharacterId: selectedCharacterId });
                setSelectedCharacterId("");
              }}
            >
              Add
            </Button>
          </div>
        )}
      </div>
      <CardBody className="flex flex-col gap-sm">
        {isLoading && <Text size="body-sm">Loading players...</Text>}
        {!isLoading && sessionPlayers?.length === 0 && (
          <Text size="body-sm">No players in this session yet.</Text>
        )}

        {sessionPlayers?.map((sp) => (
          <PlayerCard
            key={sp.id}
            layout="minimal"
            character={{
              name: sp.playerCharacter.name,
              avatarUrl: sp.playerCharacter.avatarUrl,
              class: sp.playerCharacter.class,
              level: sp.playerCharacter.level,
              currentHp: sp.currentHp,
              maxHp: sp.playerCharacter.maxHp,
              armorClass: sp.playerCharacter.armorClass,
              status: charStatusToRing[sp.charStatus],
              displayAvatar: sp.playerCharacter.displayAvatar,
              displayClass: sp.playerCharacter.displayClass,
              displayLevel: sp.playerCharacter.displayLevel,
              displayHp: sp.playerCharacter.displayHp,
              displayArmorClass: sp.playerCharacter.displayArmorClass,
              displayStatus: sp.playerCharacter.displayStatus,
            }}
          />
        ))}
      </CardBody>
    </Card>
  );
}
