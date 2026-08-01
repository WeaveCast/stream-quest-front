import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { playerCharacterKeys } from "./keys";
import type { PlayerCharacter } from "../types";

export function usePlayerCharacter(id: string) {
  return useQuery<PlayerCharacter>({
    queryKey: playerCharacterKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(`/player-character/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
