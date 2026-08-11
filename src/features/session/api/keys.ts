export const sessionKeys = {
  all: ["sessions"] as const,
  listByCampaign: (campaignId: string) =>
    [...sessionKeys.all, "list", campaignId] as const,
  detail: (id: string) => [...sessionKeys.all, "detail", id] as const,
};
