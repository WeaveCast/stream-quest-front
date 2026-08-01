import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "../keys";
import type { Resolution } from "../../types";

export interface UpdateResolutionPayload {
  message?: string;
  isFallback?: boolean;
}

export function useUpdateResolution(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      resolutionId,
      payload,
    }: {
      resolutionId: string;
      payload: UpdateResolutionPayload;
    }) => {
      const { data } = await apiClient.patch<Resolution>(
        `/event/${eventId}/resolution/${resolutionId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}
