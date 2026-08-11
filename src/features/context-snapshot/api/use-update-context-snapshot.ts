import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UpdateContextSnapshotPayload } from "../types";

export function useUpdateContextSnapshot(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateContextSnapshotPayload) => {
      const { data } = await apiClient.patch(
        `/session/${sessionId}/snapshot`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["context-snapshots", sessionId],
      });
    },
  });
}
