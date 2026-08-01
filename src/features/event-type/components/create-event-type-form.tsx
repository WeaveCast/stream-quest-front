"use client";

import { useState } from "react";
import { useCreateEventType } from "../api/use-create-event-type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export function CreateEventTypeForm({ onSuccess }: { onSuccess?: () => void }) {
  const createEventType = useCreateEventType();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createEventType.mutate(
      { name, description: description || undefined },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          onSuccess?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <Field label="Name">
        <Input
          placeholder="Wolf ambush"
          showIcon={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </Field>
      <Field label="Description (optional)">
        <Input
          placeholder="Triggered when TimeOfDay is NIGHT..."
          showIcon={false}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </Field>
      <Button
        type="submit"
        disabled={createEventType.isPending}
        className="w-full"
      >
        {createEventType.isPending ? "Creating..." : "Create event type"}
      </Button>
    </form>
  );
}
