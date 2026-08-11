import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionKeys } from "./keys";
import type { Session } from "../types";

export function useEndSession(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.patch<Session>(`/session/${id}/end`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.listByCampaign(campaignId),
      });
    },
  });
}
