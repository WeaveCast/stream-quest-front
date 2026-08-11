export const sessionEventKeys = {
  all: ["session-events"] as const,
  listBySession: (sessionId: string) =>
    [...sessionEventKeys.all, "list", sessionId] as const,
};
