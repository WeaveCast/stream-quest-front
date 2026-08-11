import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionKeys } from "./keys";
import type { Session } from "../types";

export function useSession(id: string) {
  return useQuery<Session>({
    queryKey: sessionKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiClient.get(`/session/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
