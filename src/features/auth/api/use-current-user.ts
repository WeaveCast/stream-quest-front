import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { authKeys } from "./keys";
import type { CurrentUser } from "../types";

export function useCurrentUser() {
  return useQuery<CurrentUser>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/me");
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
