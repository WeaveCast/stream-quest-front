import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { sessionPlayerCharacterKeys } from "./keys";
import type {
  SessionPlayerCharacter,
  UpdateSessionPlayerCharacterPayload,
} from "../types";

export function useUpdateSessionPlayer(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSessionPlayerCharacterPayload;
    }) => {
      const { data } = await apiClient.patch<SessionPlayerCharacter>(
        `/session/${sessionId}/player/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionPlayerCharacterKeys.listBySession(sessionId),
      });
    },
  });
}
