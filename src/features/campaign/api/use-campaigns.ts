import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { campaignKeys } from "./keys";
import type { Campaign } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useCampaigns() {
  return useInfiniteQuery({
    queryKey: campaignKeys.lists(),
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const { data } = await apiClient.get<PaginatedResult<Campaign>>(
        "/campaign",
        {
          params: pageParam ? { cursor: pageParam } : undefined,
        },
      );
      return data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
