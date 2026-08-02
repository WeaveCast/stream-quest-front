import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { twitchMappingKeys } from "./keys";
import type { TwitchMapping, CreateTwitchMappingPayload } from "../types";

export function useCreateTwitchMapping(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTwitchMappingPayload) => {
      const { data } = await apiClient.post<TwitchMapping>(
        `/campaign/${campaignId}/twitch-mapping`,
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
