import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { weatherKeys } from "./keys";
import type { Weather } from "../types";
import type { PaginatedResult } from "@/types/pagination";

export function useWeathers() {
  return useQuery<Weather[]>({
    queryKey: weatherKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<Weather>>(
        "/weather",
        { params: { limit: 100 } },
      );
      return data.data;
    },
  });
}
