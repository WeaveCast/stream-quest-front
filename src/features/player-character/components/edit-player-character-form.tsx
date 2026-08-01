import { useState } from "react";
import { usePlayerCharacter } from "../api/use-player-character";
import { DialogTitle } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export function EditForm({
  character,
  onSave,
  onCancel,
  isPending,
}: {
  character: NonNullable<ReturnType<typeof usePlayerCharacter>["data"]>;
  onSave: (payload: Record<string, unknown>) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [name, setName] = useState(character.name);
  const [characterClass, setCharacterClass] = useState(character.class ?? "");
  const [level, setLevel] = useState(String(character.level ?? 1));
  const [maxHp, setMaxHp] = useState(String(character.maxHp ?? 10));
  const [armorClass, setArmorClass] = useState(
    String(character.armorClass ?? 10),
  );
  const [avatarUrl, setAvatarUrl] = useState(character.avatarUrl ?? "");
  const [displayAvatar, setDisplayAvatar] = useState(character.displayAvatar);
  const [displayClass, setDisplayClass] = useState(character.displayClass);
  const [displayLevel, setDisplayLevel] = useState(character.displayLevel);
  const [displayHp, setDisplayHp] = useState(character.displayHp);
  const [displayArmorClass, setDisplayArmorClass] = useState(
    character.displayArmorClass,
  );
  const [displayStatus, setDisplayStatus] = useState(character.displayStatus);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({
      name,
      class: characterClass || undefined,
      level: Number(level),
      maxHp: Number(maxHp),
      armorClass: Number(armorClass),
      avatarUrl: avatarUrl || undefined,
      displayAvatar,
      displayClass,
      displayLevel,
      displayHp,
      displayArmorClass,
      displayStatus,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <DialogTitle className="mb-0">Edit Character</DialogTitle>

      <Field label="Name">
        <Input
          showIcon={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </Field>
      <Field label="Avatar URL">
        <Input
          showIcon={false}
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full"
        />
      </Field>

      <div className="flex gap-md">
        <Field label="Class" className="flex-1">
          <Input
            showIcon={false}
            value={characterClass}
            onChange={(e) => setCharacterClass(e.target.value)}
            className="w-full"
          />
        </Field>
        <Field label="Level" className="flex-1">
          <Input
            showIcon={false}
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      <div className="flex gap-md">
        <Field label="Max HP" className="flex-1">
          <Input
            showIcon={false}
            type="number"
            value={maxHp}
            onChange={(e) => setMaxHp(e.target.value)}
            className="w-full"
          />
        </Field>
        <Field label="Armor Class" className="flex-1">
          <Input
            showIcon={false}
            type="number"
            value={armorClass}
            onChange={(e) => setArmorClass(e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      <div className="h-px w-full bg-border-default" />
      <Text as="span" size="label">
        Overlay Display
      </Text>

      <div className="grid grid-cols-2 gap-sm">
        <ToggleRow
          label="Avatar"
          checked={displayAvatar}
          onCheckedChange={setDisplayAvatar}
        />
        <ToggleRow
          label="Class"
          checked={displayClass}
          onCheckedChange={setDisplayClass}
        />
        <ToggleRow
          label="Level"
          checked={displayLevel}
          onCheckedChange={setDisplayLevel}
        />
        <ToggleRow
          label="HP"
          checked={displayHp}
          onCheckedChange={setDisplayHp}
        />
        <ToggleRow
          label="Armor Class"
          checked={displayArmorClass}
          onCheckedChange={setDisplayArmorClass}
        />
        <ToggleRow
          label="Status"
          checked={displayStatus}
          onCheckedChange={setDisplayStatus}
        />
      </div>

      <div className="flex gap-sm w-full">
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-sm">
      <Toggle checked={checked} onCheckedChange={onCheckedChange} />
      <Text size="body-sm">{label}</Text>
    </div>
  );
}
