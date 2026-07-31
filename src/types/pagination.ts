export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
  previousCursor: string | null;
  count: number;
  hasMore: boolean;
  hasPrevious: boolean;
}
