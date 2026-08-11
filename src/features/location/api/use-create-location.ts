import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Location, CreateLocationPayload } from "../types";
import { locationKeys } from "./keys";

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateLocationPayload) => {
      const { data } = await apiClient.post<Location>("/location", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.lists() });
    },
  });
}
