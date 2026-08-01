import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "./keys";
import type { Event } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: eventKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<Event>>("/event", {
        params: { limit: 100 },
      });
      return data.data;
    },
  });
}
