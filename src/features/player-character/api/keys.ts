export const playerCharacterKeys = {
  all: ["player-characters"] as const,
  listByCampaign: (campaignId: string) =>
    [...playerCharacterKeys.all, "list", campaignId] as const,
  detail: (id: string) => [...playerCharacterKeys.all, "detail", id] as const,
};
