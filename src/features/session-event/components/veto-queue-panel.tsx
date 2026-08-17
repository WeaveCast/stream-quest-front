"use client";

import { useState } from "react";
import { useSessionEvents } from "../api/use-session-events";
import { useValidateSessionEvent } from "../api/use-validate-session-event";
import { useRejectSessionEvent } from "../api/use-reject-session-event";
import { useUpdateSessionEvent } from "../api/use-update-session-event";
import { useCreateSessionEvent } from "../api/use-create-session-event";
import { useEvent, useEvents } from "@/features/event";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Check, X, RefreshCw } from "lucide-react";
import { SessionEvent } from "../types";

const originColor = {
  TWITCH: "gold",
  MANUAL: "neutral",
  THRESHOLD: "success",
} as const;

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function VetoQueuePanel({ sessionId }: { sessionId: string }) {
  const { data: sessionEvents, isLoading } = useSessionEvents(sessionId);
  const { data: events } = useEvents();
  const validateEvent = useValidateSessionEvent(sessionId);
  const rejectEvent = useRejectSessionEvent(sessionId);
  const updateEvent = useUpdateSessionEvent(sessionId);
  const createEvent = useCreateSessionEvent(sessionId);

  const [swappingId, setSwappingId] = useState<string | null>(null);
  const [validatingId, setValidatingId] = useState<string | null>(null);
  const [chosenResolutionId, setChosenResolutionId] = useState("");
  const [addingManual, setAddingManual] = useState(false);
  const [manualEventId, setManualEventId] = useState("");

  const eventName = (eventId: string) =>
    events?.find((e) => e.id === eventId)?.name ?? "—";
  const pending = sessionEvents?.filter((se) => se.status === "PENDING") ?? [];

  const { data: validatingEventDetail } = useEvent(
    pending.find((se) => se.id === validatingId)?.eventId ?? "",
  );
  const resolutions = validatingEventDetail?.resolutions ?? [];

  function handleValidate(se: SessionEvent) {
    if (resolutions.length > 0 && !chosenResolutionId) return;
    validateEvent.mutate(
      {
        id: se.id,
        payload: resolutions.length > 0 ? { chosenResolutionId } : {},
      },
      {
        onSuccess: () => {
          setValidatingId(null);
          setChosenResolutionId("");
        },
      },
    );
  }

  return (
    <Card>
      <CardTitle>Veto Queue</CardTitle>
      <CardBody className="flex flex-col gap-sm">
        {isLoading && <Text size="body-sm">Loading queue...</Text>}
        {!isLoading && pending.length === 0 && !addingManual && (
          <Text size="body-sm">No pending events.</Text>
        )}

        {pending.map((se) => (
          <div
            key={se.id}
            className="flex flex-col gap-xs bg-bg-base rounded-sm p-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-xs">
                <Badge color={originColor[se.origin]} size="small">
                  {se.origin}
                </Badge>
                <Text as="span" size="body-sm">
                  {eventName(se.eventId)}
                </Text>
              </div>
              <Text as="span" size="body-sm">
                {timeAgo(se.triggeredAt)}
              </Text>
            </div>

            {validatingId === se.id ? (
              <div className="flex flex-col gap-xs">
                {resolutions.length > 0 ? (
                  <Select
                    value={chosenResolutionId}
                    onValueChange={setChosenResolutionId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a resolution..." />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.message ?? "(no message)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Text size="body-sm">
                    No resolutions configured — will validate without one.
                  </Text>
                )}
                <div className="flex gap-xs">
                  <Button
                    size="small"
                    onClick={() => handleValidate(se)}
                    disabled={
                      validateEvent.isPending ||
                      (resolutions.length > 0 && !chosenResolutionId)
                    }
                    className="flex-1"
                  >
                    {validateEvent.isPending ? "Validating..." : "Confirm"}
                  </Button>
                  <Button
                    size="small"
                    variant="secondary"
                    onClick={() => {
                      setValidatingId(null);
                      setChosenResolutionId("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : swappingId === se.id ? (
              <div className="flex items-center gap-xs">
                <Select
                  onValueChange={(eventId) =>
                    updateEvent.mutate(
                      { id: se.id, payload: { eventId } },
                      { onSuccess: () => setSwappingId(null) },
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Swap to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {events?.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => setSwappingId(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2xs">
                <IconButton
                  variant="ghost"
                  title="Validate"
                  onClick={() => {
                    setValidatingId(se.id);
                    setChosenResolutionId("");
                  }}
                >
                  <Check size={14} className="text-status-ok" />
                </IconButton>
                <IconButton
                  variant="ghost"
                  title="Reject"
                  onClick={() => rejectEvent.mutate(se.id)}
                  disabled={rejectEvent.isPending}
                >
                  <X size={14} className="text-danger-emphasis" />
                </IconButton>
                <IconButton
                  variant="ghost"
                  title="Swap"
                  onClick={() => setSwappingId(se.id)}
                >
                  <RefreshCw size={14} />
                </IconButton>
              </div>
            )}
          </div>
        ))}

        {addingManual ? (
          <div className="flex items-center gap-xs">
            <Select value={manualEventId} onValueChange={setManualEventId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event..." />
              </SelectTrigger>
              <SelectContent>
                {events?.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="small"
              disabled={!manualEventId || createEvent.isPending}
              onClick={() =>
                createEvent.mutate(
                  { eventId: manualEventId, origin: "MANUAL" },
                  {
                    onSuccess: () => {
                      setManualEventId("");
                      setAddingManual(false);
                    },
                  },
                )
              }
            >
              Add
            </Button>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setAddingManual(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="small"
            onClick={() => setAddingManual(true)}
          >
            + Add Manual
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
