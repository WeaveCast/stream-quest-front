"use client";

import { use } from "react";
import { useCampaign } from "@/features/campaign";
import { useSession, useEndSession } from "@/features/session";
import { KarmaPanel } from "@/features/campaign";
import { TwitchCountersPanel } from "@/features/twitch-mapping";
import { VetoQueuePanel } from "@/features/session-event";
import { ContextPanel } from "@/features/context-snapshot";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SessionPlayersPanel } from "@/features/session-player";

export default function LiveDashboardPage({
  params,
}: {
  params: Promise<{ campaignId: string; sessionId: string }>;
}) {
  const { campaignId, sessionId } = use(params);
  const { data: campaign } = useCampaign(campaignId);
  const { data: session, isLoading, isError } = useSession(sessionId);
  const endSession = useEndSession(campaignId);

  if (isLoading) return <Text>Loading session...</Text>;
  if (isError || !session) return <Text>Session not found.</Text>;

  return (
    <div>
      <div className="flex items-center justify-between mb-xl">
        <div>
          <Text size="body-sm" className="mb-2xs">
            {campaign?.title ?? "..."}
          </Text>
          <div className="flex items-center gap-md">
            <Heading as="h1" size="h1">
              The Hall — {session.title}
            </Heading>
            {session.status === "LIVE" && <Badge color="danger">🔴 LIVE</Badge>}
          </div>
        </div>

        {session.status === "LIVE" && (
          <Button
            variant="danger"
            onClick={() => endSession.mutate(session.id)}
            disabled={endSession.isPending}
          >
            {endSession.isPending ? "Ending..." : "End Session"}
          </Button>
        )}
      </div>

      <div className="flex gap-xl items-start mb-xl">
        <div className="w-96 shrink-0">
          <VetoQueuePanel sessionId={sessionId} />
        </div>

        <div className="flex-1 flex flex-col gap-xl">
          <KarmaPanel campaignId={campaignId} sessionId={sessionId} />
          <ContextPanel sessionId={sessionId} />
          <TwitchCountersPanel campaignId={campaignId} />
        </div>
      </div>

      <SessionPlayersPanel sessionId={sessionId} campaignId={campaignId} />
    </div>
  );
}
