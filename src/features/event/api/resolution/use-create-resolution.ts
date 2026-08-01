import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "../keys";
import type { Resolution } from "../../types";

export interface CreateResolutionPayload {
  message?: string;
  isFallback?: boolean;
  conditionGroups?: unknown[];
}

export function useCreateResolution(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateResolutionPayload) => {
      const { data } = await apiClient.post<Resolution>(
        `/event/${eventId}/resolution`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}
