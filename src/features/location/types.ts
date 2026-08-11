export interface Location {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  imageUrl: string | null;
}

export interface CreateLocationPayload {
  name: string;
  displayName: string;
  description?: string;
  imageUrl?: string;
}

export type UpdateLocationPayload = Partial<CreateLocationPayload>;
