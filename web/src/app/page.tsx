'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './lib/auth';
import { useApi } from './lib/api';
import AppShell from './components/AppShell';

// --- Types that match our backend shape ---
type AccountSummary = {
  accountId: string;
  name: string;
  currency: string;
  totals: {
    totalMarketValue: number | null;
    realizedPnl: number | null;
    unrealizedPnl: number | null;
  };
};

type PortfolioSummaryResponse = {
  accounts: AccountSummary[];
  totals: {
    totalMarketValue: number | null;
    realizedPnl: number | null;
    unrealizedPnl: number | null;
  };
};

// Small helper for formatting money
function formatCurrency(
  value: number | null | undefined,
  currency = 'EUR',
): string {
  if (value == null) return '0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const api = useApi();

  // Redirect to /login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  // Always call hooks in the same order — including useQuery
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['portfolio-summary'],
    queryFn: async () => {
      const res = await api.get<PortfolioSummaryResponse>(
        '/portfolio/summary',
      );
      return res;
    },
    // Only actually fetch once auth is ready and we have a user
    enabled: !authLoading && !!user,
  });

  // Now we can early-return safely (after all hooks)
  if (authLoading || !user) {
    return null;
  }

  return (
    <AppShell>
      <main style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>Dashboard</h1>

        {isLoading && <p>Loading...</p>}

        {isError && (
          <p style={{ color: 'red' }}>
            Error loading portfolio:{' '}
            {error instanceof Error ? error.message : String(error)}
          </p>
        )}

        {data && (
          <>
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
                Total Market Value
              </h2>
              <p style={{ fontSize: '24px', fontWeight: 600 }}>
                {formatCurrency(data.totals.totalMarketValue)}
              </p>
              <p>Realized P/L: {formatCurrency(data.totals.realizedPnl)}</p>
              <p>
                Unrealized P/L: {formatCurrency(data.totals.unrealizedPnl)}
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>
                Accounts
              </h2>
              {data.accounts.length === 0 ? (
                <p>No accounts yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Currency</th>
                      <th>Market value</th>
                      <th>Realized P/L</th>
                      <th>Unrealized P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.accounts.map((acc) => (
                      <tr key={acc.accountId}>
                        <td>{acc.name}</td>
                        <td>{acc.currency}</td>
                        <td>
                          {formatCurrency(
                            acc.totals.totalMarketValue,
                            acc.currency,
                          )}
                        </td>
                        <td>
                          {formatCurrency(
                            acc.totals.realizedPnl,
                            acc.currency,
                          )}
                        </td>
                        <td>
                          {formatCurrency(
                            acc.totals.unrealizedPnl,
                            acc.currency,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </main>
    </AppShell>
  );
}
