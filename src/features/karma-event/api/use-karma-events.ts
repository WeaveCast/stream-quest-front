import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { karmaEventKeys } from "./keys";
import type { KarmaEvent } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useKarmaEvents(campaignId: string, sessionId: string) {
  return useQuery<KarmaEvent[]>({
    queryKey: karmaEventKeys.listBySession(campaignId, sessionId),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<KarmaEvent>>(
        `/campaign/${campaignId}/karma-event`,
        { params: { sessionId, limit: 100 } },
      );
      return data.data;
    },
    enabled: !!campaignId && !!sessionId,
  });
}
