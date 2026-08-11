import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ContextSnapshot } from "../types";

export function useContextSnapshots(sessionId: string) {
  return useQuery<ContextSnapshot[]>({
    queryKey: ["context-snapshots", sessionId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/session/${sessionId}/snapshot`);
      return data;
    },
    enabled: !!sessionId,
  });
}
