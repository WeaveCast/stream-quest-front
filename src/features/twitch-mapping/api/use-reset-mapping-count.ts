import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { twitchMappingKeys } from "./keys";
import type { TwitchMapping } from "../types";

export function useResetMappingCount(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mappingId: string) => {
      const { data } = await apiClient.post<TwitchMapping>(
        `/campaign/${campaignId}/twitch-mapping/${mappingId}/reset-count`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: twitchMappingKeys.listByCampaign(campaignId),
      });
    },
  });
}
