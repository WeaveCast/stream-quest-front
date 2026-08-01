// dans hall/[campaignId]/page.tsx
"use client";

import { useState } from "react";
import { use } from "react";
import { useCampaign } from "@/features/campaign";
import { PlayerRoster } from "@/features/player-character";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KarmaBar } from "@/components/ui/karma-bar";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreatePlayerCharacterForm } from "@/features/player-character/components/create-player-character-form";

const statusBadgeColor = {
  ACTIVE: "success",
  PAUSED: "warning",
  ENDED: "neutral",
} as const;

export default function HallDashboardPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading, isError } = useCampaign(campaignId);
  const [rosterDialogOpen, setRosterDialogOpen] = useState(false);

  if (isLoading) return <Text>Loading campaign...</Text>;
  if (isError || !campaign) return <Text>Campaign not found.</Text>;

  return (
    <div>
      <div className="flex items-center justify-between mb-xs">
        <Heading as="h1" size="h1">
          {campaign.title}
        </Heading>
        <Badge color={statusBadgeColor[campaign.status]}>
          {campaign.status}
        </Badge>
      </div>

      {campaign.description && (
        <Text size="body-lg" className="mb-xl">
          {campaign.description}
        </Text>
      )}

      <Card className="mb-xl">
        <CardTitle>Karma</CardTitle>
        <CardBody>
          <KarmaBar
            karmaValue={campaign.karmaValue}
            chaosThreshold={Math.abs(campaign.chaosThreshold)}
            blessingThreshold={campaign.blessingThreshold}
            labels="inline"
          />
        </CardBody>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-sm">
          <CardTitle className="mb-0">Player Roster</CardTitle>
          <Dialog open={rosterDialogOpen} onOpenChange={setRosterDialogOpen}>
            <DialogTrigger asChild>
              <Button size="small">Add character</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add a player character</DialogTitle>
              <CreatePlayerCharacterForm campaignId={campaignId} />
            </DialogContent>
          </Dialog>
        </div>
        <CardBody>
          <PlayerRoster campaignId={campaignId} />
        </CardBody>
      </Card>
    </div>
  );
}
