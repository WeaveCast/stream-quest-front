import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionEventKeys } from "./keys";
import type { SessionEvent, SessionEventStatus } from "../types";

export function useSessionEvents(
  sessionId: string,
  status?: SessionEventStatus,
) {
  return useQuery<SessionEvent[]>({
    queryKey: [...sessionEventKeys.listBySession(sessionId), status],
    queryFn: async () => {
      const { data } = await apiClient.get(`/session/${sessionId}/event`, {
        params: { ...(status ? { status } : {}), limit: 100 },
      });
      return Array.isArray(data) ? data : data.data;
    },
    enabled: !!sessionId,
  });
}
