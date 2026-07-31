import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { campaignKeys } from "./keys";
import type { Campaign, UpdateCampaignStatusPayload } from "../types";

export function useUpdateCampaignStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCampaignStatusPayload) => {
      const { data } = await apiClient.patch<Campaign>(
        `/campaign/${id}/status`,
        payload,
      );
      return data;
    },
    onSuccess: (updatedCampaign) => {
      queryClient.setQueryData(campaignKeys.detail(id), updatedCampaign);
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
    },
  });
}
