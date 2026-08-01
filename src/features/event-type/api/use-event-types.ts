import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventTypeKeys } from "./keys";
import type { EventType } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useEventTypes() {
  return useQuery<EventType[]>({
    queryKey: eventTypeKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<EventType>>(
        "/event-type",
        {
          params: { limit: 100 },
        },
      );
      return data.data;
    },
  });
}
