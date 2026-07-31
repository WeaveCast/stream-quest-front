import Link from "next/link";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KarmaBar } from "@/components/ui/karma-bar";
import type { Campaign } from "../types";

const statusBadgeColor = {
  ACTIVE: "success",
  PAUSED: "warning",
  ENDED: "neutral",
} as const;

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link href={`/hall/${campaign.id}`}>
      <Card
        elevation="default"
        className="hover:border-accent-gold transition-colors"
      >
        <div className="flex items-center justify-between mb-sm">
          <CardTitle className="mb-0">{campaign.title}</CardTitle>
          <Badge color={statusBadgeColor[campaign.status]} size="small">
            {campaign.status}
          </Badge>
        </div>
        {campaign.description && (
          <CardBody className="mb-md line-clamp-2">
            {campaign.description}
          </CardBody>
        )}
        <KarmaBar
          karmaValue={campaign.karmaValue}
          chaosThreshold={campaign.chaosThreshold}
          blessingThreshold={campaign.blessingThreshold}
          size="sm"
        />
      </Card>
    </Link>
  );
}
