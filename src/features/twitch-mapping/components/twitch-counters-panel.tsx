"use client";

import { useTwitchMappings } from "../api/use-twitch-mappings";
import { useEvents } from "@/features/event";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Text } from "@/components/ui/typography";

export function TwitchCountersPanel({ campaignId }: { campaignId: string }) {
  const { data: mappings, isLoading } = useTwitchMappings(campaignId);
  const { data: events } = useEvents();

  const eventName = (eventId: string) =>
    events?.find((e) => e.id === eventId)?.name ?? "—";

  const visibleMappings =
    mappings?.filter((m) => m.showProgress && m.isActive) ?? [];

  return (
    <Card>
      <CardTitle>Twitch Counters</CardTitle>
      <CardBody className="flex flex-col gap-sm">
        {isLoading && <Text size="body-sm">Loading counters...</Text>}
        {!isLoading && visibleMappings.length === 0 && (
          <Text size="body-sm">No active counters to display.</Text>
        )}

        {visibleMappings.map((mapping) => (
          <div key={mapping.id} className="flex items-center gap-md">
            <Text as="span" size="body-sm" className="w-24 shrink-0">
              {eventName(mapping.eventId)}
            </Text>
            <ProgressBar
              value={mapping.currentCount}
              max={mapping.threshold}
              size="sm"
              className="flex-1"
            />
            <Text as="span" size="body-sm" className="font-mono shrink-0">
              {mapping.currentCount}/{mapping.threshold}
            </Text>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
