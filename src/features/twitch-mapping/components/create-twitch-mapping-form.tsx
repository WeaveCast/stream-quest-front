"use client";

import { useState } from "react";
import { useCreateTwitchMapping } from "../api/use-create-twitch-mapping";
import { useEvents } from "@/features/event";
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
import { CreateTwitchMappingPayload, TWITCH_EVENT_TYPES } from "../types";

export function CreateTwitchMappingForm({
  campaignId,
  onSuccess,
}: {
  campaignId: string;
  onSuccess?: () => void;
}) {
  const createMapping = useCreateTwitchMapping(campaignId);
  const { data: events, isLoading: eventsLoading } = useEvents();

  const [twitchEventType, setTwitchEventType] = useState("");
  const [eventId, setEventId] = useState("");
  const [threshold, setThreshold] = useState("1");
  const [showProgress, setShowProgress] = useState(true);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!twitchEventType || !eventId) return;

    createMapping.mutate(
      {
        twitchEventType:
          twitchEventType as CreateTwitchMappingPayload["twitchEventType"],
        eventId,
        threshold: Number(threshold),
        showProgress,
      },
      { onSuccess },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <Field label="Twitch trigger">
        <Select value={twitchEventType} onValueChange={setTwitchEventType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {TWITCH_EVENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Triggers event">
        {eventsLoading ? (
          <Text size="body-sm">Loading events...</Text>
        ) : (
          <Select value={eventId} onValueChange={setEventId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {events?.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </Field>

      <Field label="Threshold (count required)">
        <Input
          showIcon={false}
          type="number"
          min={1}
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="w-full"
        />
      </Field>

      <div className="flex items-center gap-sm">
        <Toggle checked={showProgress} onCheckedChange={setShowProgress} />
        <Text size="body-sm">Show progress on overlay</Text>
      </div>

      <Button
        type="submit"
        disabled={createMapping.isPending || !twitchEventType || !eventId}
        className="w-full"
      >
        {createMapping.isPending ? "Creating..." : "Create mapping"}
      </Button>
    </form>
  );
}
