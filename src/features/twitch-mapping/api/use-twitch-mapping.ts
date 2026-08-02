import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { twitchMappingKeys } from "./keys";
import type { DetailedTwitchMapping } from "../types";

export function useTwitchMapping(campaignId: string, mappingId: string) {
  return useQuery<DetailedTwitchMapping>({
    queryKey: twitchMappingKeys.detail(mappingId),
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/campaign/${campaignId}/twitch-mapping/${mappingId}`,
      );
      return data;
    },
    enabled: !!mappingId,
  });
}
