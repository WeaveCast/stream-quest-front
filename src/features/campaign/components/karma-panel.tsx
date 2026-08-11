"use client";

import { useState } from "react";
import { useCampaign } from "../api/use-campaign";
import { useUpdateKarma } from "../api/use-update-karma";
import { Card, CardTitle, CardBody } from "@/components/ui/card";
import { KarmaBar } from "@/components/ui/karma-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/typography";

const QUICK_ADJUST = [-10, -5, 5, 10];

export function KarmaPanel({ campaignId }: { campaignId: string }) {
  const { data: campaign } = useCampaign(campaignId);
  const updateKarma = useUpdateKarma(campaignId);
  const [customValue, setCustomValue] = useState("");

  if (!campaign) return null;

  function handleCustomSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = Number(customValue);
    if (!value) return;
    updateKarma.mutate(
      { karmaValue: value },
      { onSuccess: () => setCustomValue("") },
    );
  }

  return (
    <Card>
      <CardTitle>Karma</CardTitle>
      <CardBody className="flex flex-col gap-md">
        <KarmaBar
          karmaValue={campaign.karmaValue}
          chaosThreshold={Math.abs(campaign.chaosThreshold)}
          blessingThreshold={campaign.blessingThreshold}
          labels="inline"
        />

        <div className="flex items-center gap-xs mt-sm">
          {QUICK_ADJUST.map((delta) => (
            <Button
              key={delta}
              variant="secondary"
              size="medium"
              onClick={() => updateKarma.mutate({ karmaValue: delta })}
              disabled={updateKarma.isPending}
            >
              {delta > 0 ? `+${delta}` : delta}
            </Button>
          ))}

          <form
            onSubmit={handleCustomSubmit}
            className="flex items-center gap-xs"
          >
            <Input
              showIcon={false}
              type="number"
              placeholder="Custom"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="w-24"
            />
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              disabled={updateKarma.isPending || !customValue}
            >
              Apply
            </Button>
          </form>
          {updateKarma.isPending && <Text size="body-sm">Updating...</Text>}
        </div>
      </CardBody>
    </Card>
  );
}
