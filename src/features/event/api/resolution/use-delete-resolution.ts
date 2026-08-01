import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "../keys";

export function useDeleteResolution(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resolutionId: string) => {
      const { data } = await apiClient.delete(
        `/event/${eventId}/resolution/${resolutionId}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}
