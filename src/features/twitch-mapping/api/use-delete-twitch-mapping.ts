import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { twitchMappingKeys } from "./keys";

export function useDeleteTwitchMapping(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mappingId: string) => {
      const { data } = await apiClient.delete(
        `/campaign/${campaignId}/twitch-mapping/${mappingId}`,
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
