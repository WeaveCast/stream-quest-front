"use client";

import { useState } from "react";
import { useUpdateEvent } from "../api/use-update-event";
import { useEventTypes } from "@/features/event-type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Text } from "@/components/ui/typography";
import {
  RESOLUTION_MODES,
  type DetailedEvent,
  type ResolutionMode,
} from "../types";

const RESOLUTION_MODE_LABELS: Record<ResolutionMode, string> = {
  MJ_CHOICE: "MJ Choice",
  RANDOM: "Random",
  VIEWER_VOTE: "Viewer Vote",
};

export function EditEventForm({
  event,
  onSuccess,
}: {
  event: DetailedEvent;
  onSuccess?: () => void;
}) {
  const updateEvent = useUpdateEvent(event.id);
  const { data: eventTypes } = useEventTypes();

  const [name, setName] = useState(event.name);
  const [eventTypeId, setEventTypeId] = useState(event.eventTypeId);
  const [karmaValue, setKarmaValue] = useState(String(event.karmaValue));
  const [resolutionMode, setResolutionMode] = useState<ResolutionMode>(
    event.resolutionMode,
  );
  const [isPublic, setIsPublic] = useState(event.isPublic);
  const [isTemplate, setIsTemplate] = useState(event.isTemplate);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    updateEvent.mutate(
      {
        name,
        eventTypeId,
        karmaValue: Number(karmaValue),
        resolutionMode,
        isPublic,
        isTemplate,
      },
      { onSuccess },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <Field label="Name">
        <Input
          showIcon={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </Field>

      <div className="flex gap-md">
        <Field label="Event type" className="flex-1">
          <Select value={eventTypeId} onValueChange={setEventTypeId}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {eventTypes?.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Karma value" className="flex-1">
          <Input
            showIcon={false}
            type="number"
            value={karmaValue}
            onChange={(e) => setKarmaValue(e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      <Field label="Resolution mode">
        <Select
          value={resolutionMode}
          onValueChange={(v) => setResolutionMode(v as ResolutionMode)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RESOLUTION_MODES.map((mode) => (
              <SelectItem key={mode} value={mode}>
                {RESOLUTION_MODE_LABELS[mode]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="flex items-center gap-lg">
        <div className="flex items-center gap-sm">
          <Toggle checked={isPublic} onCheckedChange={setIsPublic} />
          <Text size="body-sm">Public</Text>
        </div>
        <div className="flex items-center gap-sm">
          <Toggle checked={isTemplate} onCheckedChange={setIsTemplate} />
          <Text size="body-sm">Template</Text>
        </div>
      </div>

      <Button type="submit" disabled={updateEvent.isPending} className="w-full">
        {updateEvent.isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
