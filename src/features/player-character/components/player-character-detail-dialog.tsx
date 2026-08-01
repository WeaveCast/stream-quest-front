"use client";

import { useState } from "react";
import { usePlayerCharacter } from "../api/use-player-character";
import { useUpdatePlayerCharacter } from "../api/use-update-player-character";
import { useDeletePlayerCharacter } from "../api/use-delete-player-character";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { EditForm } from "./edit-player-character-form";

export function PlayerCharacterDetailDialog({
  characterId,
  campaignId,
  onClose,
}: {
  characterId: string | null;
  campaignId: string;
  onClose: () => void;
}) {
  const { data: character, isLoading } = usePlayerCharacter(characterId ?? "");
  const updateCharacter = useUpdatePlayerCharacter(
    characterId ?? "",
    campaignId,
  );
  const deleteCharacter = useDeletePlayerCharacter(campaignId);

  const [editing, setEditing] = useState(false);

  function handleDelete() {
    if (!character) return;
    if (!confirm(`Delete "${character.name}"? This cannot be undone.`)) return;
    deleteCharacter.mutate(character.id, { onSuccess: onClose });
  }

  return (
    <Dialog open={!!characterId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[29rem]">
        {isLoading || !character ? (
          <Text>Loading...</Text>
        ) : editing ? (
          <EditForm
            character={character}
            onSave={(payload) =>
              updateCharacter.mutate(payload, {
                onSuccess: () => setEditing(false),
              })
            }
            onCancel={() => setEditing(false)}
            isPending={updateCharacter.isPending}
          />
        ) : (
          <div className="flex flex-col gap-lg w-full">
            <DialogTitle className="mb-0">Character Details</DialogTitle>

            <div className="flex items-center gap-md">
              <Avatar
                avatarName={character.name}
                avatarUrl={character.avatarUrl}
                status="ok"
                size="lg"
              />
              <div className="flex-1">
                <Text as="span" size="body-lg" className="block">
                  {character.name}
                </Text>
                <Text as="span" size="body-sm">
                  {character.class ?? "—"} · Level {character.level ?? "—"}
                </Text>
              </div>
            </div>

            <div className="h-px w-full bg-border-default" />

            <div className="flex gap-xl">
              <div>
                <Text as="span" size="body-sm" className="block">
                  Armor Class
                </Text>
                <Text as="span" size="body-lg">
                  {character.armorClass ?? "—"}
                </Text>
              </div>
              <div>
                <Text as="span" size="body-sm" className="block">
                  Max HP
                </Text>
                <Text as="span" size="body-lg">
                  {character.maxHp ?? "—"}
                </Text>
              </div>
              <div>
                <Text as="span" size="body-sm" className="block">
                  Status
                </Text>
                <Text as="span" size="body-lg">
                  {character.isAlive ? "Alive" : "Deceased"}
                </Text>
              </div>
            </div>

            <div className="h-px w-full bg-border-default" />

            <Text as="span" size="label">
              Overlay Display
            </Text>
            <Text size="body-sm">
              {[
                character.displayAvatar && "Avatar",
                character.displayClass && "Class",
                character.displayLevel && "Level",
                character.displayHp && "HP",
                character.displayArmorClass && "Armor Class",
                character.displayStatus && "Status",
              ]
                .filter(Boolean)
                .join(", ") || "Nothing displayed"}
            </Text>

            <div className="flex gap-sm w-full">
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleDelete}
                disabled={deleteCharacter.isPending}
              >
                {deleteCharacter.isPending ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setEditing(true)}
              >
                Edit Character
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
