import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "./keys";
import type { DetailedEvent } from "../types";

export function useEvent(id: string) {
  return useQuery<DetailedEvent>({
    queryKey: eventKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(`/event/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
