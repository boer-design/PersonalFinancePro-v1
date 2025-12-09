'use client';

import { useAuth } from './auth';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  token: string | null,
  body?: TBody,
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let errorMessage = `API ${method} ${path} failed: ${res.status} ${res.statusText}`;

    try {
      const data = await res.json();
      if (data && data.message) {
        errorMessage += ` – ${JSON.stringify(data)}`;
      }
    } catch {
      // ignore JSON parse errors
    }

    // eslint-disable-next-line no-console
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  // If there's no body, return undefined as TResponse
  if (res.status === 204) {
    return undefined as TResponse;
  }

  const data = (await res.json()) as TResponse;
  return data;
}

export type ApiClient = {
  get<TResponse>(path: string): Promise<TResponse>;
  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
  ): Promise<TResponse>;
};

export function useApi(): ApiClient {
  const { token } = useAuth();

  return {
    get: <TResponse>(path: string) =>
      request<TResponse>('GET', path, token ?? null),
    post: <TResponse, TBody = unknown>(path: string, body?: TBody) =>
      request<TResponse, TBody>('POST', path, token ?? null, body),
  };
}
