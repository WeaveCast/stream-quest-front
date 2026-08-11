import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionKeys } from "./keys";
import type { Session, CreateSessionPayload } from "../types";

export function useCreateSession(campaignId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSessionPayload) => {
      const { data } = await apiClient.post<Session>("/session", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.listByCampaign(campaignId),
      });
    },
  });
}
