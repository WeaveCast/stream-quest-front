export const weatherKeys = {
  all: ["weathers"] as const,
  lists: () => [...weatherKeys.all, "list"] as const,
};
