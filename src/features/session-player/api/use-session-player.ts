import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionPlayerCharacterKeys } from "./keys";
import type { SessionPlayerCharacter } from "../types";

export function useSessionPlayers(sessionId: string) {
  return useQuery<SessionPlayerCharacter[]>({
    queryKey: sessionPlayerCharacterKeys.listBySession(sessionId),
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/session/${sessionId}/session-player-character`,
      );
      return Array.isArray(data) ? data : data.data;
    },
    enabled: !!sessionId,
  });
}
