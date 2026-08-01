import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "./keys";
import type { Event, CreateEventPayload } from "../types";

export function useUpdateEvent(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<CreateEventPayload>) => {
      const { data } = await apiClient.patch<Event>(`/event/${id}`, payload);
      return data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(eventKeys.detail(id), (old: unknown) =>
        old ? { ...(old as object), ...updated } : updated,
      );
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
}
