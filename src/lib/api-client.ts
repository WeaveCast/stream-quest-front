// src/lib/api-client.ts
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status;
    const body = error.response?.data;

    if (status === 401) {
      return Promise.reject(error);
    }

    const rawMessage = body?.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(", ")
      : (rawMessage ?? body?.error ?? "Something went wrong");

    toast.error(message);

    console.log(rawMessage);

    return Promise.reject(error);
  },
);
