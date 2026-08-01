"use client";

import { useState } from "react";
import { useEvent } from "../api/use-event";
import { useDeleteEvent } from "../api/use-delete-event";
import { useDeleteResolution } from "../api/resolution/use-delete-resolution";
import { useEventTypes } from "@/features/event-type";
import { EditEventForm } from "./edit-event-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Text } from "@/components/ui/typography";
import { Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RuleForm } from "./rule-form";
import { useDeleteRule } from "../api/rule/use-delete-rule";
import { ResolutionForm } from "./resolution-form";

export function EventDetailDialog({
  eventId,
  onClose,
}: {
  eventId: string | null;
  onClose: () => void;
}) {
  const { data: event, isLoading } = useEvent(eventId ?? "");
  const { data: eventTypes } = useEventTypes();
  const deleteEvent = useDeleteEvent();
  const deleteResolution = useDeleteResolution(eventId ?? "");

  const [editOpen, setEditOpen] = useState(false);
  const [addingResolution, setAddingResolution] = useState(false);
  const [editingResolutionId, setEditingResolutionId] = useState<string | null>(
    null,
  );

  const [addingRule, setAddingRule] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const deleteRule = useDeleteRule(eventId ?? "");

  const eventType = eventTypes?.find((t) => t.id === event?.eventTypeId);

  function handleDelete() {
    if (!event) return;
    if (!confirm(`Delete "${event.name}"? This cannot be undone.`)) return;
    deleteEvent.mutate(event.id, { onSuccess: onClose });
  }

  return (
    <Dialog open={!!eventId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[34rem]">
        {isLoading || !event ? (
          <Text>Loading...</Text>
        ) : editOpen ? (
          <div className="flex flex-col gap-lg w-full">
            <DialogTitle className="mb-0">Edit Event</DialogTitle>
            <EditEventForm event={event} onSuccess={() => setEditOpen(false)} />
          </div>
        ) : (
          <div className="flex flex-col gap-lg w-full">
            <DialogTitle className="mb-0">{event.name}</DialogTitle>

            <div className="flex items-center gap-sm">
              {eventType && <Badge color="neutral">{eventType.name}</Badge>}
              <span
                className={cn(
                  "text-mono text-body-sm",
                  event.karmaValue > 0
                    ? "text-status-ok"
                    : event.karmaValue < 0
                      ? "text-danger-emphasis"
                      : "text-text-secondary",
                )}
              >
                Karma:{" "}
                {event.karmaValue > 0
                  ? `+${event.karmaValue}`
                  : event.karmaValue}
              </span>
            </div>

            <div className="h-px w-full bg-border-default" />

            <div className="flex items-center justify-between w-full">
              <Text as="span" size="label">
                Resolutions ({event.resolutions.length})
              </Text>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setAddingResolution((v) => !v)}
              >
                {addingResolution ? "Cancel" : "+ Add Resolution"}
              </Button>
            </div>

            {addingResolution && (
              <ResolutionForm
                eventId={event.id}
                onSuccess={() => setAddingResolution(false)}
                onCancel={() => setAddingResolution(false)}
              />
            )}

            {event.resolutions.length === 0 && !addingResolution && (
              <Text size="body-sm">No resolutions yet.</Text>
            )}

            {event.resolutions.map((resolution) =>
              editingResolutionId === resolution.id ? (
                <ResolutionForm
                  key={resolution.id}
                  eventId={event.id}
                  resolution={resolution}
                  onSuccess={() => setEditingResolutionId(null)}
                  onCancel={() => setEditingResolutionId(null)}
                />
              ) : (
                <div
                  key={resolution.id}
                  className="flex flex-col gap-2xs w-full bg-bg-base rounded-sm p-sm"
                >
                  <div className="flex items-center gap-xs w-full">
                    <Text as="span" size="body-sm" className="flex-1">
                      {resolution.message ?? "—"}
                    </Text>
                    <div className="flex gap-2xs">
                      <IconButton
                        variant="ghost"
                        onClick={() => setEditingResolutionId(resolution.id)}
                      >
                        <Pencil size={14} />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        onClick={() => deleteResolution.mutate(resolution.id)}
                        disabled={deleteResolution.isPending}
                      >
                        <X size={14} />
                      </IconButton>
                    </div>
                  </div>
                  <Text
                    as="span"
                    size="body-sm"
                    className={
                      resolution.isFallback
                        ? "text-text-secondary"
                        : "text-accent-gold"
                    }
                  >
                    💡{" "}
                    {resolution.isFallback
                      ? "Fallback — used when no other condition matches"
                      : "Conditional"}
                  </Text>
                </div>
              ),
            )}

            <div className="h-px w-full bg-border-default" />

            <div className="flex items-center justify-between w-full">
              <Text as="span" size="label">
                Trigger Rule
              </Text>
              {event.rules.length === 0 && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setAddingRule(true)}
                >
                  + Add Rule
                </Button>
              )}
            </div>

            {addingRule && (
              <RuleForm
                eventId={event.id}
                onSuccess={() => setAddingRule(false)}
                onCancel={() => setAddingRule(false)}
              />
            )}

            {event.rules.map((rule) =>
              editingRuleId === rule.id ? (
                <RuleForm
                  key={rule.id}
                  eventId={event.id}
                  rule={rule}
                  onSuccess={() => setEditingRuleId(null)}
                  onCancel={() => setEditingRuleId(null)}
                />
              ) : (
                <div
                  key={rule.id}
                  className="flex items-center justify-between w-full"
                >
                  <Text
                    size="body-sm"
                    className="text-text-secondary font-mono"
                  >
                    {rule.triggerType} · Cooldown: {rule.cooldown}s ·{" "}
                    {rule.isActive ? "🟢 Active" : "⚪ Inactive"}
                  </Text>
                  <div className="flex gap-2xs">
                    <IconButton
                      variant="ghost"
                      onClick={() => setEditingRuleId(rule.id)}
                    >
                      <Pencil size={14} />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      onClick={() => deleteRule.mutate(rule.id)}
                      disabled={deleteRule.isPending}
                    >
                      <X size={14} />
                    </IconButton>
                  </div>
                </div>
              ),
            )}

            <div className="flex gap-sm w-full">
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleDelete}
                disabled={deleteEvent.isPending}
              >
                {deleteEvent.isPending ? "Deleting..." : "Delete Event"}
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setEditOpen(true)}
              >
                Edit Event
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
