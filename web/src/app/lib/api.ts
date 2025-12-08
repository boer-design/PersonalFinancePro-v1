'use client';

import { useAuth } from '../lib/auth';

// Adjust if you want a different URL, but this matches your Nest app:
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export type ApiClient = {
  get<T>(path: string): Promise<T>;
  post<TReq, TRes>(path: string, body: TReq): Promise<TRes>;
};

export function useApi(): ApiClient {
  const { token } = useAuth();

  async function request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      // Helpful error message for debugging
      const text = await res.text();
      throw new Error(
        `API ${method} ${path} failed: ${res.status} ${res.statusText} – ${text}`,
      );
    }

    return res.json() as Promise<T>;
  }

  return {
    get: <T>(path: string) => request<T>('GET', path),
    post: <TReq, TRes>(path: string, body: TReq) =>
      request<TRes>('POST', path, body),
  };
}
