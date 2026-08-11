import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Weather, CreateWeatherPayload } from "../types";
import { weatherKeys } from "./keys";

export function useCreateWeather() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateWeatherPayload) => {
      const { data } = await apiClient.post<Weather>("/weather", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weatherKeys.lists() });
    },
  });
}
