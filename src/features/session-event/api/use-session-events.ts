import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionEventKeys } from "./keys";
import type { SessionEvent } from "../types";

export function useSessionEvents(sessionId: string) {
  return useQuery<SessionEvent[]>({
    queryKey: sessionEventKeys.listBySession(sessionId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/session/${sessionId}/event`);
      return Array.isArray(data) ? data : data.data;
    },
    enabled: !!sessionId,
  });
}
