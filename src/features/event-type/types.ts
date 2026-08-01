export interface EventType {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: string;
}

export interface CreateEventTypePayload {
  name: string;
  description?: string;
}
