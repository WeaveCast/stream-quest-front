import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { eventKeys } from "../keys";
import type { Rule } from "../../types";
import type { CreateRulePayload } from "./use-create-rule";

export function useUpdateRule(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      ruleId,
      payload,
    }: {
      ruleId: string;
      payload: Partial<CreateRulePayload>;
    }) => {
      const { data } = await apiClient.patch<Rule>(
        `/event/${eventId}/rule/${ruleId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) });
    },
  });
}
