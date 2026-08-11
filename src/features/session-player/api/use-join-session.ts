import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionPlayerCharacterKeys } from "./keys";
import type { SessionPlayerCharacter, JoinSessionPayload } from "../types";

export function useJoinSession(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: JoinSessionPayload) => {
      const { data } = await apiClient.post<SessionPlayerCharacter>(
        `/session/${sessionId}/player`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionPlayerCharacterKeys.listBySession(sessionId),
      });
    },
  });
}
