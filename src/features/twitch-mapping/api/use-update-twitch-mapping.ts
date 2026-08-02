import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { twitchMappingKeys } from "./keys";
import type { TwitchMapping, UpdateTwitchMappingPayload } from "../types";

export function useUpdateTwitchMapping(campaignId: string, mappingId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateTwitchMappingPayload) => {
      const { data } = await apiClient.patch<TwitchMapping>(
        `/campaign/${campaignId}/twitch-mapping/${mappingId}`,
        payload,
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
