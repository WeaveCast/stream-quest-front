export const eventTypeKeys = {
  all: ["event-types"] as const,
  lists: () => [...eventTypeKeys.all, "list"] as const,
};
