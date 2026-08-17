export const karmaEventKeys = {
  all: ["karma-events"] as const,
  listBySession: (campaignId: string, sessionId: string) =>
    [...karmaEventKeys.all, "list", campaignId, sessionId] as const,
};
