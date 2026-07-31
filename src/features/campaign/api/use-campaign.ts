import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { campaignKeys } from "./keys";
import type { Campaign } from "../types";

export function useCampaign(id: string) {
  return useQuery<Campaign>({
    queryKey: campaignKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(`/campaign/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
