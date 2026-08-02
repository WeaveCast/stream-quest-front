"use client";

import { use, useState } from "react";
import { TwitchMapping, useTwitchMappings } from "@/features/twitch-mapping";
import { useResetMappingCount } from "@/features/twitch-mapping";
import { CreateTwitchMappingForm } from "@/features/twitch-mapping";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { TwitchMappingDetailDialog } from "@/features/twitch-mapping/components/twitch-mapping-detail-dialog";
import { useCampaign } from "@/features/campaign";
import Link from "next/link";
import { useEvents } from "@/features/event";

export default function RunesPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const { data: campaign } = useCampaign(campaignId);
  const { data: mappings, isLoading } = useTwitchMappings(campaignId);
  const { data: events } = useEvents();
  const resetCount = useResetMappingCount(campaignId);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const eventName = (eventId: string) =>
    events?.find((e) => e.id === eventId)?.name ?? "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-xl">
        <Heading as="h1" size="h1">
          The Runes
        </Heading>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>+ New Mapping</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>New Mapping</DialogTitle>
            <CreateTwitchMappingForm
              campaignId={campaignId}
              onSuccess={() => setCreateOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Text size="body-lg" className="mb-xl">
        Managing triggers for{" "}
        <Link
          href={`/hall/${campaignId}`}
          className="text-accent-gold hover:underline"
        >
          {campaign?.title ?? "..."}
        </Link>
      </Text>

      {isLoading && <Text>Loading mappings...</Text>}
      {!isLoading && mappings?.length === 0 && (
        <Text>No Twitch mappings yet.</Text>
      )}

      <div className="flex flex-col gap-md">
        {mappings?.map((mapping) => (
          <div
            key={mapping.id}
            className="rounded-lg border border-border-default/40 p-md flex flex-col gap-sm"
          >
            <div className="flex items-center justify-between">
              <Text as="span" size="body-lg">
                <>
                  {console.log(mapping)}
                  {mapping.twitchEventType} → {eventName(mapping.eventId)}
                </>
              </Text>
              <div className="flex items-center gap-sm">
                <Badge
                  color={mapping.isActive ? "success" : "neutral"}
                  size="small"
                >
                  {mapping.isActive ? "Active" : "Inactive"}
                </Badge>
                <IconButton
                  variant="ghost"
                  onClick={() => setSelectedId(mapping.id)}
                >
                  <Settings size={16} />
                </IconButton>
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <ProgressBar
                value={mapping.currentCount}
                max={mapping.threshold}
                size="sm"
                className="flex-1"
              />
              <Text as="span" size="body-sm" className="shrink-0">
                {mapping.currentCount}/{mapping.threshold}
              </Text>
              <Button
                variant="secondary"
                size="small"
                onClick={() => resetCount.mutate(mapping.id)}
                disabled={resetCount.isPending}
              >
                Reset
              </Button>
            </div>
          </div>
        ))}
      </div>

      <TwitchMappingDetailDialog
        key={selectedId}
        campaignId={campaignId}
        mappingId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
