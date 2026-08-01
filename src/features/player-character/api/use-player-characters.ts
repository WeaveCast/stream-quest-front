import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { playerCharacterKeys } from "./keys";
import type { PlayerCharacter } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function usePlayerCharacters(campaignId: string) {
  return useQuery<PlayerCharacter[]>({
    queryKey: playerCharacterKeys.listByCampaign(campaignId),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<PlayerCharacter>>(
        "/player-character",
        {
          params: { campaignId },
        },
      );
      return data.data;
    },
    enabled: !!campaignId,
  });
}
