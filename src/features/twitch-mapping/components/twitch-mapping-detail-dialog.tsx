"use client";

import { useState } from "react";
import { useTwitchMapping } from "../api/use-twitch-mapping";
import { useUpdateTwitchMapping } from "../api/use-update-twitch-mapping";
import { useDeleteTwitchMapping } from "../api/use-delete-twitch-mapping";
import { useResetMappingCount } from "../api/use-reset-mapping-count";
import { useEvents } from "@/features/event";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { TWITCH_EVENT_TYPES } from "../types";

export function TwitchMappingDetailDialog({
  campaignId,
  mappingId,
  onClose,
}: {
  campaignId: string;
  mappingId: string | null;
  onClose: () => void;
}) {
  const { data: mapping, isLoading } = useTwitchMapping(
    campaignId,
    mappingId ?? "",
  );
  const { data: events } = useEvents();
  const updateMapping = useUpdateTwitchMapping(campaignId, mappingId ?? "");
  const deleteMapping = useDeleteTwitchMapping(campaignId);
  const resetCount = useResetMappingCount(campaignId);

  return (
    <Dialog open={!!mappingId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[29rem]">
        {isLoading || !mapping ? (
          <Text>Loading...</Text>
        ) : (
          <EditForm
            mapping={mapping}
            events={events ?? []}
            onSave={(payload) =>
              updateMapping.mutate(payload, { onSuccess: onClose })
            }
            onDelete={() => {
              if (!confirm("Delete this mapping? This cannot be undone."))
                return;
              deleteMapping.mutate(mapping.id, { onSuccess: onClose });
            }}
            onReset={() => resetCount.mutate(mapping.id)}
            onCancel={onClose}
            isSaving={updateMapping.isPending}
            isDeleting={deleteMapping.isPending}
            isResetting={resetCount.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function EditForm({
  mapping,
  events,
  onSave,
  onDelete,
  onReset,
  onCancel,
  isSaving,
  isDeleting,
  isResetting,
}: {
  mapping: import("../types").DetailedTwitchMapping;
  events: { id: string; name: string }[];
  onSave: (payload: Record<string, unknown>) => void;
  onDelete: () => void;
  onReset: () => void;
  onCancel: () => void;
  isSaving: boolean;
  isDeleting: boolean;
  isResetting: boolean;
}) {
  const [twitchEventType, setTwitchEventType] = useState(
    mapping.twitchEventType,
  );
  const [eventId, setEventId] = useState(mapping.eventId);
  const [threshold, setThreshold] = useState(String(mapping.threshold));
  const [showProgress, setShowProgress] = useState(mapping.showProgress);
  const [isActive, setIsActive] = useState(mapping.isActive);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave({
      twitchEventType,
      eventId,
      threshold: Number(threshold),
      showProgress,
      isActive,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <DialogTitle className="mb-0">Edit Mapping</DialogTitle>

      <div className="flex items-center justify-between w-full bg-bg-base rounded-sm p-sm">
        <Text size="body-sm">
          Current progress: {mapping.currentCount}/{mapping.threshold}
        </Text>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onReset}
          disabled={isResetting}
        >
          {isResetting ? "Resetting..." : "Reset"}
        </Button>
      </div>

      <div className="flex gap-md">
        <Field label="Trigger type" className="flex-1">
          <Select
            value={twitchEventType}
            onValueChange={(v) =>
              setTwitchEventType(v as typeof twitchEventType)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
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
        <Field label="Event" className="flex-1">
          <Select value={eventId} onValueChange={setEventId}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Threshold (count needed to trigger)">
        <Input
          showIcon={false}
          type="number"
          min={1}
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="w-full"
        />
      </Field>

      <div className="flex items-center gap-lg">
        <div className="flex items-center gap-sm">
          <Toggle checked={showProgress} onCheckedChange={setShowProgress} />
          <Text size="body-sm">Show progress bar</Text>
        </div>
        <div className="flex items-center gap-sm">
          <Toggle checked={isActive} onCheckedChange={setIsActive} />
          <Text size="body-sm">Active</Text>
        </div>
      </div>

      <div className="flex gap-sm w-full">
        <Button
          type="button"
          variant="danger"
          onClick={onDelete}
          disabled={isDeleting}
          className="flex-1"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving} className="flex-1">
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
