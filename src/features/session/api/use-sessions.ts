import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionKeys } from "./keys";
import type { Session } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useSessions(campaignId: string) {
  return useQuery<Session[]>({
    queryKey: sessionKeys.listByCampaign(campaignId),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<Session>>(
        "/session",
        {
          params: { campaignId, limit: 100 },
        },
      );
      return data.data;
    },
    enabled: !!campaignId,
  });
}
