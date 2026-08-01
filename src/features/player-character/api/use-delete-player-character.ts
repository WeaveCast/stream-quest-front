import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { playerCharacterKeys } from "./keys";

export function useDeletePlayerCharacter(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/player-character/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playerCharacterKeys.listByCampaign(campaignId),
      });
    },
  });
}
