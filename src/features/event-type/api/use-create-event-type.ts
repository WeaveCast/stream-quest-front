import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventTypeKeys } from "./keys";
import type { EventType, CreateEventTypePayload } from "../types";

export function useCreateEventType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventTypePayload) => {
      const { data } = await apiClient.post<EventType>("/event-type", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventTypeKeys.lists() });
    },
  });
}
