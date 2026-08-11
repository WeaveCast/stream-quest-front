export interface Weather {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  iconUrl: string | null;
}

export interface CreateWeatherPayload {
  name: string;
  displayName: string;
  description?: string;
  iconUrl?: string;
}

export type UpdateWeatherPayload = Partial<CreateWeatherPayload>;
