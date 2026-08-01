import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { playerCharacterKeys } from "./keys";
import type { PlayerCharacter } from "../types";
import type { UpdatePlayerCharacterPayload } from "../types";

export function useUpdatePlayerCharacter(id: string, campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdatePlayerCharacterPayload) => {
      const { data } = await apiClient.patch<PlayerCharacter>(
        `/player-character/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(playerCharacterKeys.detail(id), updated);
      queryClient.invalidateQueries({
        queryKey: playerCharacterKeys.listByCampaign(campaignId),
      });
    },
  });
}
