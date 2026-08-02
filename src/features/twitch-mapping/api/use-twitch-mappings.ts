import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { twitchMappingKeys } from "./keys";
import type { DetailedTwitchMapping } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useTwitchMappings(campaignId: string) {
  return useQuery<DetailedTwitchMapping[]>({
    queryKey: twitchMappingKeys.listByCampaign(campaignId),
    queryFn: async () => {
      const { data } = await apiClient.get<
        PaginatedResult<DetailedTwitchMapping>
      >(`/campaign/${campaignId}/twitch-mapping`, { params: { limit: 100 } });
      return data.data;
    },
    enabled: !!campaignId,
  });
}
