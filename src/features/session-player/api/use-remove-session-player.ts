// api/use-remove-session-player.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionPlayerCharacterKeys } from "./keys";

export function useRemoveSessionPlayer(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spcId: string) => {
      const { data } = await apiClient.delete(
        `/session/${sessionId}/player/${spcId}`,
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
