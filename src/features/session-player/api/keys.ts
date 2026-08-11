export const sessionPlayerCharacterKeys = {
  all: ["session-player-characters"] as const,
  listBySession: (sessionId: string) =>
    [...sessionPlayerCharacterKeys.all, "list", sessionId] as const,
};
