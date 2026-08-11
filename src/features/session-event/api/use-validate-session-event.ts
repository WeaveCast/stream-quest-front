import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionEventKeys } from "./keys";
import type { SessionEvent, ValidateSessionEventPayload } from "../types";

export function useValidateSessionEvent(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload?: ValidateSessionEventPayload;
    }) => {
      const { data } = await apiClient.patch<SessionEvent>(
        `/session/${sessionId}/event/${id}/validate`,
        payload ?? {},
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
