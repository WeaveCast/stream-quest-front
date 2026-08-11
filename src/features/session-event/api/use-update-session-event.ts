import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionEventKeys } from "./keys";
import type { SessionEvent, UpdateSessionEventPayload } from "../types";

export function useUpdateSessionEvent(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSessionEventPayload;
    }) => {
      const { data } = await apiClient.patch<SessionEvent>(
        `/session/${sessionId}/event/${id}`,
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
