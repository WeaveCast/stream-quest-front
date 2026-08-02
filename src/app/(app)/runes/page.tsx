"use client";

import { CampaignList } from "@/features/campaign";
import { Heading, Text } from "@/components/ui/typography";

export default function RunesPage() {
  return (
    <div>
      <Heading as="h1" size="h1" className="mb-xs">
        The Runes
      </Heading>
      <Text size="body-lg" className="mb-xl">
        Choose a campaign to manage its Twitch triggers.
      </Text>
      <CampaignList hrefBuilder={(id) => `/runes/${id}`} />
    </div>
  );
}
