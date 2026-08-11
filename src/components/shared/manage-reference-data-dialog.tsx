"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { IconButton } from "@/components/ui/icon-button";
import { Text } from "@/components/ui/typography";
import { Trash2, Pencil } from "lucide-react";

interface ReferenceItem {
  id: string;
  name: string;
  displayName: string;
  description?: string | null;
}

interface ReferenceFormPayload {
  name: string;
  displayName: string;
  description?: string;
}

export function ManageReferenceDataDialog<T extends ReferenceItem>({
  title,
  triggerLabel,
  imageFieldLabel,
  items,
  onCreate,
  onUpdate,
  onDelete,
  isCreating,
  isUpdating,
}: {
  title: string;
  triggerLabel: string;
  imageFieldLabel: string;
  items: T[] | undefined;
  onCreate: (
    payload: ReferenceFormPayload & Record<string, string | undefined>,
  ) => void;
  onUpdate: (
    id: string,
    payload: ReferenceFormPayload & Record<string, string | undefined>,
  ) => void;
  onDelete: (id: string) => void;
  isCreating: boolean;
  isUpdating: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  function resetCreateForm() {
    setName("");
    setDisplayName("");
    setDescription("");
    setImageUrl("");
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onCreate({
      name: name.toUpperCase().replace(/\s+/g, "_"),
      displayName,
      description: description || undefined,
      imageUrl: imageUrl || undefined,
    });
    resetCreateForm();
  }

  function startEditing(item: T) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditDisplayName(item.displayName);
    setEditDescription(item.description ?? "");
    setEditImageUrl(
      (item as { imageUrl?: string; iconUrl?: string }).imageUrl ??
        (item as { iconUrl?: string }).iconUrl ??
        "",
    );
  }

  function handleUpdateSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingId) return;
    onUpdate(editingId, {
      name: editName.toUpperCase().replace(/\s+/g, "_"),
      displayName: editDisplayName,
      description: editDescription || undefined,
      imageUrl: editImageUrl || undefined,
    });
    setEditingId(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="small">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>

        <div className="flex flex-col gap-sm mb-md">
          {items?.length === 0 && <Text size="body-sm">Nothing here yet.</Text>}

          {items?.map((item) =>
            editingId === item.id ? (
              <form
                key={item.id}
                onSubmit={handleUpdateSubmit}
                className="flex flex-col gap-xs bg-bg-base rounded-sm p-sm"
              >
                <Field label="Display name">
                  <Input
                    showIcon={false}
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    required
                    className="w-full"
                  />
                </Field>
                <Field label="Internal name">
                  <Input
                    showIcon={false}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full"
                  />
                </Field>
                <Field label="Description (optional)">
                  <Input
                    showIcon={false}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full"
                  />
                </Field>
                <Field label={imageFieldLabel}>
                  <Input
                    showIcon={false}
                    value={editImageUrl}
                    onChange={(e) => setEditImageUrl(e.target.value)}
                    className="w-full"
                  />
                </Field>
                <div className="flex gap-xs">
                  <Button
                    type="submit"
                    size="small"
                    disabled={isUpdating}
                    className="flex-1"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => setEditingId(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div key={item.id} className="flex items-center justify-between">
                <Text as="span" size="body-sm">
                  {item.displayName}
                </Text>
                <div className="flex gap-2xs">
                  <IconButton
                    variant="ghost"
                    onClick={() => startEditing(item)}
                  >
                    <Pencil size={14} />
                  </IconButton>
                  <IconButton variant="ghost" onClick={() => onDelete(item.id)}>
                    <Trash2 size={14} />
                  </IconButton>
                </div>
              </div>
            ),
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-sm w-full">
          <Field label="Display name">
            <Input
              showIcon={false}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full"
            />
          </Field>
          <Field label="Internal name (auto: UPPER_CASE)">
            <Input
              showIcon={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </Field>
          <Field label="Description (optional)">
            <Input
              showIcon={false}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </Field>
          <Field label={imageFieldLabel}>
            <Input
              showIcon={false}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full"
            />
          </Field>
          <Button type="submit" size="medium" disabled={isCreating}>
            {isCreating ? "Adding..." : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
