'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Separator from '@radix-ui/react-separator';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from 'next/link';

import AppShell from '../components/AppShell';
import { useAuth } from '../lib/auth';
import { useApi } from '../lib/api';
import { useAccountsQuery } from '../lib/accounts';

type Position = {
  assetId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  realizedPnl: number;
  currentPrice: number | null;
  marketValue: number | null;
  unrealizedPnl: number | null;
};

type HoldingsResponse = {
  accountId: string;
  holdings: Position[];
  totals: {
    totalQuantity: number;
    realizedPnl: number;
    totalMarketValue: number;
    unrealizedPnl: number;
  };
};

function formatCurrency(value: number | null | undefined, currency = 'EUR') {
  if (value == null) return '0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PortfolioPage() {
  const { user, loading: authLoading } = useAuth();
  const api = useApi();

  const { data: accounts, isLoading: accountsLoading } = useAccountsQuery(
    !authLoading && !!user,
  );

  const [selectedAccountId, setSelectedAccountId] = useState<string>('');

  useEffect(() => {
    if (!accounts || accounts.length === 0) return;
    if (!selectedAccountId) {
      setSelectedAccountId(accounts[0].id);
    }
  }, [accounts, selectedAccountId]);

  const {
    data: holdings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['portfolio-holdings', selectedAccountId],
    enabled: !!selectedAccountId && !!user,
    queryFn: () =>
      api.get<HoldingsResponse>(`/portfolio/account/${selectedAccountId}/holdings`),
  });

  const positions: Position[] = useMemo(
    () => holdings?.holdings ?? [],
    [holdings],
  );

  return (
    <AppShell>
      <main className="px-8 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Portfolio</h1>
            <p className="text-sm text-slate-400">
              View your current positions and account totals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-300">Account</label>
            <select
              className="border border-slate-700 bg-slate-900 rounded px-3 py-2 text-sm min-w-[220px]"
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              disabled={accountsLoading || !accounts?.length}
            >
              {(accounts ?? []).map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.currency}
                  {acc.type ? ` • ${acc.type}` : ''})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="border border-slate-700/80 rounded-xl bg-slate-900/70 p-4 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">Navigation</h2>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/portfolio"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/70 border border-slate-700 text-slate-100"
                >
                  Portfolio
                  <span className="text-[10px] px-2 py-1 rounded bg-indigo-600/20 text-indigo-200 border border-indigo-500/40">
                    Current
                  </span>
                </Link>
                <Link
                  href="/trades"
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-slate-700 text-slate-100 hover:bg-slate-800/60"
                >
                  Trades
                  <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Table
                  </span>
                </Link>
              </div>
            </div>

            <Separator.Root className="h-px bg-slate-700" />

            <div className="space-y-2 text-sm">
              <div className="text-slate-400">Account market value</div>
              <div className="text-2xl font-semibold">
                {formatCurrency(holdings?.totals.totalMarketValue)}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Realized P/L</span>
                <span className="font-medium">
                  {formatCurrency(holdings?.totals.realizedPnl)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unrealized P/L</span>
                <span className="font-medium">
                  {formatCurrency(holdings?.totals.unrealizedPnl)}
                </span>
              </div>
            </div>
          </aside>

          <section className="border border-slate-700/80 rounded-xl bg-slate-900/70 shadow-lg">
            <div className="px-5 py-4 border-b border-slate-700/70 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Positions</h2>
                <p className="text-xs text-slate-400">
                  Holdings for the selected account.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="p-5 text-sm text-slate-300">Loading positions...</div>
            ) : isError ? (
              <div className="p-5 text-sm text-red-400">
                Error loading holdings:{' '}
                {error instanceof Error ? error.message : String(error)}
              </div>
            ) : positions.length === 0 ? (
              <div className="p-5 text-sm text-slate-300">No positions yet.</div>
            ) : (
              <ScrollArea.Root className="max-h-[600px]">
                <ScrollArea.Viewport className="p-5">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-slate-900/80 border-b border-slate-700">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">Symbol</th>
                          <th className="px-3 py-2 text-left font-medium">Name</th>
                          <th className="px-3 py-2 text-right font-medium">Quantity</th>
                          <th className="px-3 py-2 text-right font-medium">Avg buy</th>
                          <th className="px-3 py-2 text-right font-medium">
                            Current price
                          </th>
                          <th className="px-3 py-2 text-right font-medium">
                            Market value
                          </th>
                          <th className="px-3 py-2 text-right font-medium">
                            Unrealized P/L
                          </th>
                          <th className="px-3 py-2 text-right font-medium">
                            Realized P/L
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((p) => (
                          <tr
                            key={p.assetId}
                            className="border-t border-slate-700/60 hover:bg-slate-900/60"
                          >
                            <td className="px-3 py-2 font-semibold">{p.symbol}</td>
                            <td className="px-3 py-2 text-slate-200">{p.name}</td>
                            <td className="px-3 py-2 text-right">
                              {p.quantity.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {p.avgBuyPrice.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {p.currentPrice !== null ? p.currentPrice.toFixed(2) : '—'}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {p.marketValue !== null ? p.marketValue.toFixed(2) : '—'}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {p.unrealizedPnl !== null
                                ? p.unrealizedPnl.toFixed(2)
                                : '—'}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {p.realizedPnl.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="ScrollAreaScrollbar"
                >
                  <ScrollArea.Thumb className="ScrollAreaThumb" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}

