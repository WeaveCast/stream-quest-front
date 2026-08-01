"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCampaign } from "../api/use-create-campaign";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

export function CreateCampaignForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const createCampaign = useCreateCampaign();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chaosThreshold, setChaosThreshold] = useState("-100");
  const [blessingThreshold, setBlessingThreshold] = useState("100");

  const thresholdError =
    Number(chaosThreshold) >= Number(blessingThreshold)
      ? "Chaos threshold must be less than Blessing threshold."
      : null;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (thresholdError) return;

    createCampaign.mutate(
      {
        title,
        description: description || undefined,
        chaosThreshold: Number(chaosThreshold),
        blessingThreshold: Number(blessingThreshold),
      },
      {
        onSuccess: (campaign) => {
          onSuccess?.();
          router.push(`/hall/${campaign.id}`);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-md w-full">
      <Input
        placeholder="Campaign title"
        showIcon={false}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full"
      />
      <Input
        placeholder="Description (optional)"
        showIcon={false}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full"
      />
      <div className="flex gap-md w-full">
        <Input
          placeholder="Chaos threshold"
          showIcon={false}
          type="number"
          value={chaosThreshold}
          onChange={(e) => setChaosThreshold(e.target.value)}
          required
          className="w-full"
        />
        <Input
          placeholder="Blessing threshold"
          showIcon={false}
          type="number"
          value={blessingThreshold}
          onChange={(e) => setBlessingThreshold(e.target.value)}
          required
          className="w-full"
        />
      </div>

      {thresholdError && <Text size="body-sm">{thresholdError}</Text>}

      <Button
        type="submit"
        disabled={createCampaign.isPending || !!thresholdError}
        className="w-full"
      >
        {createCampaign.isPending ? "Creating..." : "Create campaign"}
      </Button>
    </form>
  );
}
