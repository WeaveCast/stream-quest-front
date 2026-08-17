"use client";

import { useMemo, useState } from "react";
import { useCampaigns } from "@/features/campaign";
import { useSessions } from "@/features/session";
import { useSessionEvents } from "@/features/session-event";
import { useKarmaEvents } from "@/features/karma-event";
import { useEvents } from "@/features/event";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type EntryFilter = "all" | "validated" | "rejected" | "karma";

const statusBadgeColor = {
  PLANNED: "neutral",
  LIVE: "success",
  ENDED: "neutral",
} as const;

function sessionDuration(startedAt: string | null, endedAt: string | null) {
  if (!startedAt || !endedAt) return null;
  const ms = new Date(endedAt).getTime() - new Date(startedAt).getTime();
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h${m.toString().padStart(2, "0")}m` : `${m}m`;
}

export default function ChroniclePage() {
  const { data: campaignsData } = useCampaigns();
  const campaigns = campaignsData?.pages.flatMap((p) => p.data) ?? [];

  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [entryFilter, setEntryFilter] = useState<EntryFilter>("all");
  const [search, setSearch] = useState("");

  const { data: sessions } = useSessions(selectedCampaignId);
  const { data: sessionEvents } = useSessionEvents(selectedSessionId);
  const { data: karmaEvents } = useKarmaEvents(
    selectedCampaignId,
    selectedSessionId,
  );
  const { data: events } = useEvents();

  const selectedSession = sessions?.find((s) => s.id === selectedSessionId);

  const filteredSessionEvents = useMemo(() => {
    return (sessionEvents ?? [])
      .filter((se) => {
        if (entryFilter === "validated") return se.status === "VALIDATED";
        if (entryFilter === "rejected") return se.status === "REJECTED";
        if (entryFilter === "karma") return false;
        return se.status !== "PENDING";
      })
      .filter((se) => {
        if (!search) return true;
        const s = search.toLowerCase();
        const name = events?.find((e) => e.id === se.eventId)?.name ?? "";
        return (
          name.toLowerCase().includes(s) ||
          (se.finalMessage?.toLowerCase().includes(s) ?? false) ||
          se.origin.toLowerCase().includes(s)
        );
      });
  }, [sessionEvents, entryFilter, search, events]);

  const filteredKarmaEvents = useMemo(() => {
    if (entryFilter !== "karma" && entryFilter !== "all") return [];
    if (!search) return karmaEvents ?? [];
    const s = search.toLowerCase();
    return (karmaEvents ?? []).filter(
      (ke) => ke.reason?.toLowerCase().includes(s) ?? false,
    );
  }, [karmaEvents, entryFilter, search]);

  const mergedTimeline = useMemo(() => {
    const seEntries = filteredSessionEvents.map((se) => ({
      kind: "session-event" as const,
      date: se.triggeredAt,
      data: se,
    }));

    const keEntries = filteredKarmaEvents.map((ke) => ({
      kind: "karma-event" as const,
      date: ke.occurredAt,
      data: ke,
    }));

    return [...seEntries, ...keEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [filteredSessionEvents, filteredKarmaEvents]);

  const validatedCount =
    sessionEvents?.filter((se) => se.status === "VALIDATED").length ?? 0;
  const rejectedCount =
    sessionEvents?.filter((se) => se.status === "REJECTED").length ?? 0;

  return (
    <div>
      <Heading as="h1" size="h1" className="mb-xl">
        The Chronicle
      </Heading>

      <div className="flex gap-xl">
        <div className="w-[220px] shrink-0 flex flex-col gap-md">
          <div>
            <Text as="span" size="label" className="block mb-sm">
              Campaigns
            </Text>
            <div className="flex flex-col gap-xs">
              <button
                onClick={() => {
                  setSelectedCampaignId("");
                  setSelectedSessionId("");
                }}
                className={`text-body-sm text-left ${
                  !selectedCampaignId
                    ? "text-accent-gold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                · All
              </button>
              {campaigns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCampaignId(c.id);
                    setSelectedSessionId("");
                  }}
                  className={`text-body-sm text-left truncate ${
                    selectedCampaignId === c.id
                      ? "text-accent-gold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  · {c.title}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border-default" />

          <div>
            <Text as="span" size="label" className="block mb-sm">
              Filter
            </Text>
            <div className="flex flex-col gap-xs">
              {(["all", "validated", "rejected", "karma"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setEntryFilter(f)}
                  className={`text-body-sm text-left ${
                    entryFilter === f
                      ? "text-accent-gold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  ·{" "}
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-lg">
          <div className="flex gap-lg w-full">
            <Select
              value={selectedCampaignId}
              onValueChange={(v) => {
                setSelectedCampaignId(v);
                setSelectedSessionId("");
              }}
            >
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="Campaign..." />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedSessionId}
              onValueChange={setSelectedSessionId}
              disabled={!selectedCampaignId || !sessions?.length}
            >
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="Session..." />
              </SelectTrigger>
              <SelectContent>
                {sessions?.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Search..."
              showIcon
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
          </div>

          {!selectedSessionId && (
            <div className="flex flex-col items-center justify-center py-4xl text-text-secondary">
              <Heading size="h1" className="mb-md">
                📜
              </Heading>
              <Text size="body-lg" className="mb-xs">
                No sessions recorded yet
              </Text>
              <Text size="body-sm">
                Once you run a session in The Hall, its history will appear
                here.
              </Text>
            </div>
          )}

          {selectedSessionId && selectedSession && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <Text
                  as="span"
                  size="body-lg"
                  className="font-heading uppercase"
                >
                  {selectedSession.title} —{" "}
                  {new Date(selectedSession.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  )}
                  {sessionDuration(
                    selectedSession.startedAt,
                    selectedSession.endedAt,
                  ) && (
                    <>
                      {" "}
                      —{" "}
                      {sessionDuration(
                        selectedSession.startedAt,
                        selectedSession.endedAt,
                      )}
                    </>
                  )}
                </Text>
                <Badge
                  color={statusBadgeColor[selectedSession.status]}
                  size="small"
                >
                  {selectedSession.status}
                </Badge>
              </div>

              <Text size="body-sm" className="text-text-secondary">
                Events: {validatedCount} ✅ {rejectedCount} ❌
              </Text>

              <div className="flex flex-col gap-sm">
                {mergedTimeline.map((entry) => (
                  <div key={entry.data.id} className="flex gap-md items-start">
                    <Text
                      as="span"
                      size="body-sm"
                      className="w-14 shrink-0 font-mono text-text-secondary"
                    >
                      {new Date(entry.date).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>

                    {entry.kind === "session-event" && (
                      <div className="flex flex-col gap-2xs flex-1">
                        <Text as="span" size="body-sm">
                          {entry.data.status === "VALIDATED" ? "✅" : "❌"}{" "}
                          {events?.find((e) => e.id === entry.data.eventId)
                            ?.name ?? "—"}
                          {entry.data.finalMessage && (
                            <> → {entry.data.finalMessage}</>
                          )}
                          {entry.data.status === "REJECTED" && " — Rejected"}
                        </Text>
                        <Text
                          as="span"
                          size="body-sm"
                          className="text-text-secondary font-mono"
                        >
                          {entry.data.origin}
                        </Text>
                      </div>
                    )}

                    {entry.kind === "karma-event" && (
                      <div className="flex flex-col gap-2xs flex-1">
                        <Text as="span" size="body-sm">
                          ⚖️ Karma{" "}
                          <span
                            className={
                              entry.data.value > 0
                                ? "text-status-ok"
                                : entry.data.value < 0
                                  ? "text-danger-emphasis"
                                  : "text-text-secondary"
                            }
                          >
                            {entry.data.value > 0
                              ? `+${entry.data.value}`
                              : entry.data.value}
                          </span>
                        </Text>
                        {entry.data.reason && (
                          <Text
                            as="span"
                            size="body-sm"
                            className="text-text-secondary"
                          >
                            {entry.data.reason}
                          </Text>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {mergedTimeline.length === 0 && (
                  <Text size="body-sm" className="text-text-secondary">
                    No entries match your filters.
                  </Text>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
