import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "../keys";
import type { Rule } from "../../types";

export interface CreateRulePayload {
  triggerType: string;
  config: Record<string, unknown>;
  cooldown?: number;
}

export function useCreateRule(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateRulePayload) => {
      const { data } = await apiClient.post<Rule>(
        `/event/${eventId}/rule`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}
