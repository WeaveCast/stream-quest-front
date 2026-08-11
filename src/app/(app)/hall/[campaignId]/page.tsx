"use client";

import { use } from "react";
import { useCampaign } from "@/features/campaign";
import { useSessions } from "@/features/session";
import { PlayerRoster } from "@/features/player-character";
import { SessionPanel } from "@/features/session";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import Link from "next/link";

const statusBadgeColor = {
  ACTIVE: "success",
  PAUSED: "warning",
  ENDED: "neutral",
} as const;

export default function HallPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading, isError } = useCampaign(campaignId);
  const { data: sessions } = useSessions(campaignId);

  const liveSession = sessions?.find((s) => s.status === "LIVE");

  if (isLoading) return <Text>Loading campaign...</Text>;
  if (isError || !campaign) return <Text>Campaign not found.</Text>;

  return (
    <div>
      <div className="flex items-center justify-between mb-xl">
        <Heading as="h1" size="h1">
          {campaign.title}
        </Heading>
        <Badge color={statusBadgeColor[campaign.status]}>
          {campaign.status}
        </Badge>
      </div>

      {liveSession && (
        <Card elevation="hover" className="mb-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-sm mb-2xs">
                <Badge color="danger" size="small">
                  🔴 LIVE
                </Badge>
                <CardTitle className="mb-0">{liveSession.title}</CardTitle>
              </div>
              <Text size="body-sm">This session is currently live.</Text>
            </div>
            <Link href={`/hall/${campaignId}/${liveSession.id}`}>
              <Button>Continue Live Session</Button>
            </Link>
          </div>
        </Card>
      )}

      <SessionPanel campaignId={campaignId} />

      <div className="mt-xl">
        <Card>
          <div className="flex items-center justify-between mb-sm">
            <CardTitle className="mb-0">Player Roster</CardTitle>
          </div>
          <CardBody>
            <PlayerRoster campaignId={campaignId} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
