import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionEventKeys } from "./keys";
import type { SessionEvent } from "../types";

export function useRejectSessionEvent(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.patch<SessionEvent>(
        `/session/${sessionId}/event/${id}/reject`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionEventKeys.listBySession(sessionId),
      });
    },
  });
}
