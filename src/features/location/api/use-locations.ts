import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Location } from "../types";
import type { PaginatedResult } from "@/types/pagination";
import { locationKeys } from "./keys";

export function useLocations() {
  return useQuery<Location[]>({
    queryKey: locationKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResult<Location>>(
        "/location",
        { params: { limit: 100 } },
      );
      return data.data;
    },
  });
}
