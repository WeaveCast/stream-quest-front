import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionEventKeys } from "./keys";
import type { SessionEvent, CreateSessionEventPayload } from "../types";

export function useCreateSessionEvent(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSessionEventPayload) => {
      const { data } = await apiClient.post<SessionEvent>(
        `/session/${sessionId}/event`,
        payload,
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
