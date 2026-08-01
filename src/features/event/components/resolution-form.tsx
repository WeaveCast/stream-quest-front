"use client";

import { useState } from "react";
import { useCreateResolution } from "../api/resolution/use-create-resolution";
import { useUpdateResolution } from "../api/resolution/use-update-resolution";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Text } from "@/components/ui/typography";
import type { Resolution } from "../types";

export function ResolutionForm({
  eventId,
  resolution,
  onSuccess,
  onCancel,
}: {
  eventId: string;
  resolution?: Resolution;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const createResolution = useCreateResolution(eventId);
  const updateResolution = useUpdateResolution(eventId);
  const isEditing = !!resolution;

  const [message, setMessage] = useState(resolution?.message ?? "");
  const [isFallback, setIsFallback] = useState(resolution?.isFallback ?? false);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isEditing) {
      updateResolution.mutate(
        { resolutionId: resolution.id, payload: { message, isFallback } },
        { onSuccess },
      );
    } else {
      createResolution.mutate(
        { message, isFallback, conditionGroups: [] },
        { onSuccess },
      );
    }
  }

  const isPending = createResolution.isPending || updateResolution.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-sm w-full bg-bg-base rounded-sm p-sm"
    >
      <Input
        placeholder="The wolves emerge from the shadows..."
        showIcon={false}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full"
      />
      <div className="flex items-center gap-sm">
        <Toggle checked={isFallback} onCheckedChange={setIsFallback} />
        <Text size="body-sm">Fallback (always applies)</Text>
      </div>
      <div className="flex gap-sm">
        <Button
          type="submit"
          size="small"
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? "Saving..." : isEditing ? "Save" : "Add"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
