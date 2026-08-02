"use client";

import { useCampaigns } from "../api/use-campaigns";
import { CampaignCard } from "./campaign-card";
import { Text } from "@/components/ui/typography";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function CampaignList({
  hrefBuilder,
}: {
  hrefBuilder?: (id: string) => string;
}) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCampaigns();

  const loadMoreRef = useIntersectionObserver(
    () => fetchNextPage(),
    !!hasNextPage && !isFetchingNextPage,
  );

  if (isLoading) return <Text>Loading campaigns...</Text>;
  if (isError) return <Text>Failed to load campaigns.</Text>;

  const campaigns = data?.pages.flatMap((page) => page.data) ?? [];

  if (campaigns.length === 0) {
    return <Text>No campaigns yet. Create your first one to get started.</Text>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            href={hrefBuilder?.(campaign.id)}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-1" />

      {isFetchingNextPage && <Text className="mt-lg">Loading more...</Text>}
    </div>
  );
}
