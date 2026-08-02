export const twitchMappingKeys = {
  all: ["twitch-mappings"] as const,
  listByCampaign: (campaignId: string) =>
    [...twitchMappingKeys.all, "list", campaignId] as const,
  detail: (id: string) => [...twitchMappingKeys.all, "detail", id] as const,
};
