import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { campaignKeys } from "./keys";
import type { Campaign } from "../types";

export interface UpdateKarmaPayload {
  karmaValue: number;
  reason?: string;
  sessionId?: string;
}

interface UpdateKarmaResponse {
  newKarmaValue: number;
  karmaEvent: {
    id: string;
    value: number;
    reason: string | null;
    occurredAt: string;
    sessionId: string | null;
    campaignId: string;
  };
}

export function useUpdateKarma(campaignId: string, sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateKarmaPayload) => {
      const { data } = await apiClient.patch<UpdateKarmaResponse>(
        `/campaign/${campaignId}/karma`,
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        campaignKeys.detail(campaignId),
        (old: Campaign | undefined) =>
          old ? { ...old, karmaValue: data.newKarmaValue } : old,
      );
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
    },
  });
}
