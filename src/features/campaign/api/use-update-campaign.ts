import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { campaignKeys } from "./keys";
import type { Campaign, UpdateCampaignPayload } from "../types";

export function useUpdateCampaign(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateCampaignPayload) => {
      const { data } = await apiClient.patch<Campaign>(
        `/campaign/${id}`,
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
