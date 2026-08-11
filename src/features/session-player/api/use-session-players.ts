import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionPlayerCharacterKeys } from "./keys";
import type { SessionPlayerCharacter } from "../types";

export function useSessionPlayers(sessionId: string) {
  return useQuery<SessionPlayerCharacter[]>({
    queryKey: sessionPlayerCharacterKeys.listBySession(sessionId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/session/${sessionId}/player`);
      return data;
    },
    enabled: !!sessionId,
  });
}
