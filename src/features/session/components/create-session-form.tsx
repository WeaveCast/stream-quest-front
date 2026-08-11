"use client";

import { useState } from "react";
import { useCreateSession } from "../api/use-create-session";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export function CreateSessionForm({
  campaignId,
  onSuccess,
}: {
  campaignId: string;
  onSuccess?: () => void;
}) {
  const createSession = useCreateSession(campaignId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createSession.mutate(
      { campaignId, title, description: description || undefined },
      { onSuccess },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <Field label="Title">
        <Input
          showIcon={false}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <Button
        type="submit"
        disabled={createSession.isPending}
        className="w-full"
      >
        {createSession.isPending ? "Creating..." : "Create session"}
      </Button>
    </form>
  );
}
