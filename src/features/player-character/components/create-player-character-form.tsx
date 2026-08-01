"use client";

import { useState } from "react";
import { useCreatePlayerCharacter } from "../api/use-create-player-character";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export function CreatePlayerCharacterForm({
  campaignId,
  onSuccess,
}: {
  campaignId: string;
  onSuccess?: () => void;
}) {
  const createPlayerCharacter = useCreatePlayerCharacter();

  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [level, setLevel] = useState("1");
  const [maxHp, setMaxHp] = useState("10");
  const [armorClass, setArmorClass] = useState("10");
  const [avatarUrl, setAvatarUrl] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    createPlayerCharacter.mutate(
      {
        campaignId,
        name,
        class: characterClass || undefined,
        level: Number(level),
        maxHp: Number(maxHp),
        armorClass: Number(armorClass),
        avatarUrl: avatarUrl || undefined,
      },
      {
        onSuccess: () => {
          setName("");
          setCharacterClass("");
          setLevel("1");
          setMaxHp("10");
          setArmorClass("10");
          setAvatarUrl("");
          onSuccess?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <Field label="Name">
        <Input
          placeholder="Character name"
          showIcon={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </Field>

      <Field label="Class">
        <Input
          placeholder="e.g. Ranger"
          showIcon={false}
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
          className="w-full"
        />
      </Field>

      <div className="flex gap-md w-full">
        <Field label="Level">
          <Input
            showIcon={false}
            type="number"
            min={1}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full"
          />
        </Field>
        <Field label="Max HP">
          <Input
            showIcon={false}
            type="number"
            min={1}
            value={maxHp}
            onChange={(e) => setMaxHp(e.target.value)}
            className="w-full"
          />
        </Field>
        <Field label="Armor Class">
          <Input
            showIcon={false}
            type="number"
            min={0}
            value={armorClass}
            onChange={(e) => setArmorClass(e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      <Field label="Avatar URL (optional)">
        <Input
          placeholder="https://..."
          showIcon={false}
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full"
        />
      </Field>

      <Button
        type="submit"
        disabled={createPlayerCharacter.isPending}
        className="w-full"
      >
        {createPlayerCharacter.isPending ? "Creating..." : "Add character"}
      </Button>
    </form>
  );
}
