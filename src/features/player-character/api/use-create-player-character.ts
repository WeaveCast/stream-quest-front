import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { playerCharacterKeys } from "./keys";
import type { PlayerCharacter, CreatePlayerCharacterPayload } from "../types";

export function useCreatePlayerCharacter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePlayerCharacterPayload) => {
      const { data } = await apiClient.post<PlayerCharacter>(
        "/player-character",
        payload,
      );
      return data;
    },
    onSuccess: (character) => {
      queryClient.invalidateQueries({
        queryKey: playerCharacterKeys.listByCampaign(character.campaignId),
      });
    },
  });
}
