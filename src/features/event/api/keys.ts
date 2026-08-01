export const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  detail: (id: string) => [...eventKeys.all, "detail", id] as const,
};
