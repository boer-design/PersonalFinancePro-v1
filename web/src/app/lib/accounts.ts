'use client';

import { useQuery } from '@tanstack/react-query';
import { useApi } from './api';

export type Account = {
  id: string;
  name: string;
  type?: string | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Fetches the current user's accounts.
 * `enabled` should be true only once auth token is available.
 */
export function useAccountsQuery(enabled: boolean) {
  const api = useApi();

  return useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get<Account[]>('/accounts'),
    enabled,
  });
}
