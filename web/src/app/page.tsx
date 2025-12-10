'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as Separator from '@radix-ui/react-separator';
import { useAuth } from './lib/auth';
import { useApi } from './lib/api';
import AppShell from './components/AppShell';
import { Table } from './components/ui';

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
      <main className="px-8 py-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-400">
              Portfolio overview and account summaries.
            </p>
          </div>
        </div>

        {isLoading && <p className="text-sm text-slate-300">Loading...</p>}

        {isError && (
          <p className="text-sm text-red-400">
            Error loading portfolio:{' '}
            {error instanceof Error ? error.message : String(error)}
          </p>
        )}

        {data && (
          <div className="grid gap-5 lg:grid-cols-3">
            <section className="lg:col-span-1 border border-slate-700/80 rounded-xl p-5 bg-slate-900/60 shadow-lg">
              <h2 className="text-lg font-semibold mb-3">Totals</h2>
              <div className="space-y-2 text-sm">
                <div className="text-slate-400">Total Market Value</div>
                <div className="text-2xl font-semibold">
                  {formatCurrency(data.totals.totalMarketValue)}
                </div>
                <Separator.Root className="h-px bg-slate-700 my-2" />
                <div className="flex justify-between">
                  <span className="text-slate-400">Realized P/L</span>
                  <span className="font-medium">
                    {formatCurrency(data.totals.realizedPnl)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unrealized P/L</span>
                  <span className="font-medium">
                    {formatCurrency(data.totals.unrealizedPnl)}
                  </span>
                </div>
              </div>
            </section>

            <section className="lg:col-span-2 border border-slate-700/80 rounded-xl bg-slate-900/60 shadow-lg">
              <div className="px-5 py-4 border-b border-slate-700/70 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Accounts</h2>
                  <p className="text-xs text-slate-400">
                    Per-account market value and P/L
                  </p>
                </div>
              </div>
              <div className="p-5">
                {data.accounts.length === 0 ? (
                  <p className="text-sm text-slate-300">No accounts yet.</p>
                ) : (
                  <Table>
                    <Table.Head>
                      <Table.HeadRow>
                        <Table.HeaderCell>
                          <Table.ColumnTitle>Name</Table.ColumnTitle>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <Table.ColumnTitle>Currency</Table.ColumnTitle>
                        </Table.HeaderCell>
                        <Table.HeaderCell align="right">
                          <Table.ColumnTitle align="right">
                            Market value
                          </Table.ColumnTitle>
                        </Table.HeaderCell>
                        <Table.HeaderCell align="right">
                          <Table.ColumnTitle align="right">
                            Realized P/L
                          </Table.ColumnTitle>
                        </Table.HeaderCell>
                        <Table.HeaderCell align="right">
                          <Table.ColumnTitle align="right">
                            Unrealized P/L
                          </Table.ColumnTitle>
                        </Table.HeaderCell>
                      </Table.HeadRow>
                    </Table.Head>
                    <Table.Body>
                      {data.accounts.map((acc) => (
                        <Table.Row key={acc.accountId}>
                          <Table.Cell>{acc.name}</Table.Cell>
                          <Table.Cell>{acc.currency}</Table.Cell>
                          <Table.Cell align="right">
                            {formatCurrency(
                              acc.totals.totalMarketValue,
                              acc.currency,
                            )}
                          </Table.Cell>
                          <Table.Cell align="right">
                            {formatCurrency(
                              acc.totals.realizedPnl,
                              acc.currency,
                            )}
                          </Table.Cell>
                          <Table.Cell align="right">
                            {formatCurrency(
                              acc.totals.unrealizedPnl,
                              acc.currency,
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </AppShell>
  );
}
