"use client";

import { useState } from "react";
import { useCreateEvent } from "../api/use-create-event";
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
import { TRIGGER_TYPES, TriggerType, type ResolutionMode } from "../types";

const TRIGGER_TYPES_LABELS: Record<TriggerType, string> = {
  SUB_TIER1: "Sub Tier 1",
  SUB_TIER2: "Sub Tier 2",
  SUB_TIER3: "Sub Tier 3",
  SUB_PRIME: "Sub Twitch Prime",
  GIFT_SUB: "Gift Sub",
  BITS: "Bits",
  RAID: "Raid",
  FOLLOW: "Follow",
  CHAT_COMMAND: "Chat command",
};

export function CreateEventForm({ onSuccess }: { onSuccess?: () => void }) {
  const createEvent = useCreateEvent();
  const { data: eventTypes, isLoading: eventTypesLoading } = useEventTypes();

  const [name, setName] = useState("");
  const [eventTypeId, setEventTypeId] = useState("");
  const [karmaValue, setKarmaValue] = useState("0");
  const [resolutionMode, setResolutionMode] =
    useState<ResolutionMode>("MJ_CHOICE");
  const [isPublic, setIsPublic] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);
  const [triggerType, setTriggerType] = useState("");
  const [cooldown, setCooldown] = useState("300");
  const [command, setCommand] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!eventTypeId) return;

    createEvent.mutate(
      {
        name,
        eventTypeId,
        karmaValue: Number(karmaValue),
        isPublic,
        isTemplate,
        resolutionMode,
      },
      {
        onSuccess: async (event) => {
          if (triggerType) {
            const config =
              triggerType === "CHAT_COMMAND" && command ? { command } : {};
            try {
              await createRuleForEvent(event.id, {
                triggerType,
                config,
                cooldown: Number(cooldown),
              });
            } catch {}
          }
          onSuccess?.();
        },
      },
    );
  }

  async function createRuleForEvent(
    eventId: string,
    payload: {
      triggerType: string;
      config: Record<string, unknown>;
      cooldown: number;
    },
  ) {
    const { apiClient } = await import("@/lib/api-client");
    await apiClient.post(`/event/${eventId}/rule`, payload);
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

      <div className="flex gap-md">
        <Field label="Event type" className="flex-1">
          {eventTypesLoading ? (
            <Text size="body-sm">Loading...</Text>
          ) : (
            <Select value={eventTypeId} onValueChange={setEventTypeId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {eventTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
            <SelectItem value="MJ_CHOICE">MJ Choice</SelectItem>
            <SelectItem value="RANDOM">Random</SelectItem>
            <SelectItem value="VIEWER_VOTE">Viewer Vote</SelectItem>
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

      <div className="h-px w-full bg-border-default" />
      <Text as="span" size="label">
        Trigger Rule (optional)
      </Text>

      <div className="flex gap-md">
        <Field label="Trigger type" className="flex-1">
          <Select value={triggerType} onValueChange={setTriggerType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              {TRIGGER_TYPES.map((trigger) => (
                <SelectItem key={trigger} value={trigger}>
                  {TRIGGER_TYPES_LABELS[trigger]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Cooldown (s)" className="flex-1">
          <Input
            showIcon={false}
            type="number"
            value={cooldown}
            onChange={(e) => setCooldown(e.target.value)}
            className="w-full"
          />
        </Field>
      </div>

      {triggerType === "CHAT_COMMAND" && (
        <Field label="Command">
          <Input
            placeholder="!wolf"
            showIcon={false}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full"
          />
        </Field>
      )}

      <Button
        type="submit"
        disabled={createEvent.isPending || !eventTypeId}
        className="w-full"
      >
        {createEvent.isPending ? "Creating..." : "Create event"}
      </Button>
    </form>
  );
}
