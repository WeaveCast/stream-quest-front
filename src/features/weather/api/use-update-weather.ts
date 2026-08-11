import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { weatherKeys } from "./keys";
import type { Weather, UpdateWeatherPayload } from "../types";

export function useUpdateWeather() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateWeatherPayload;
    }) => {
      const { data } = await apiClient.patch<Weather>(
        `/weather/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weatherKeys.lists() });
    },
  });
}
