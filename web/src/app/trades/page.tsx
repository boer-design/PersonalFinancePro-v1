'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import Papa from 'papaparse';

import AppShell from '../components/AppShell';
import { useApi } from '../lib/api';
import { useAuth } from '../lib/auth';


// --- Types matching our backend ---

export type TradeSide = 'BUY' | 'SELL';

type Trade = {
  id: string;
  accountId: string;
  accountName?: string; // backend can send this if you include it
  assetSymbol: string;
  assetName?: string;
  date: string;
  side: TradeSide;
  quantity: number;
  price: number;
  fee: number;
};

type TradesResponse = {
  trades: Trade[];
  total: number;
  page: number;
  pageSize: number;
};

// Import format we send to backend
type ImportTradeRowDto = {
  date: string; // ISO string
  symbol: string;
  name: string;
  side: TradeSide;
  quantity: number;
  price: number;
  fee: number;
};

type ImportTradesDto = {
  accountId: string;
  trades: ImportTradeRowDto[];
};

export default function TradesPage() {
  const { user } = useAuth();
  const api = useApi();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [accountFilter, setAccountFilter] = useState<string | 'all'>('all');

  // --- Fetch trades ---

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trades', { page, pageSize, accountId: accountFilter }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (accountFilter !== 'all') {
        params.set('accountId', accountFilter);
      }
      const res = await api.get<TradesResponse>(`/trades?${params.toString()}`);
      return res;
    },
  });

  const trades =
  (Array.isArray(data) ? data : data?.trades) ?? [];

const totalTrades = trades.length;

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.pageSize));
  }, [data]);

  // --- CSV import ---

  const importMutation = useMutation({
    mutationFn: async (payload: ImportTradesDto) => {
      return api.post<ImportTradesDto, { imported: number }>(
        '/trades/import',
        payload,
      );
    },
    onSuccess: () => {
      // Refetch trades after successful import
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
  });

  function handleCsvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // TEMP: hard-code an account for now or choose from UI later
    const accountId = accountFilter === 'all' ? '' : accountFilter;
    if (!accountId) {
      alert('Select an account before importing.');
      e.target.value = '';
      return;
    }

    Papa.parse<ImportTradeRowDto>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const rows = result.data.filter(
          (row) => row.symbol && row.date,
        ) as ImportTradeRowDto[];

        try {
          await importMutation.mutateAsync({ accountId, trades: rows });
          alert(`Imported ${rows.length} trades`);
        } catch (err) {
          console.error(err);
          alert('Import failed; see console for details');
        } finally {
          e.target.value = '';
        }
      },
    });
  }

  return (
    <AppShell>
      <main style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>All trades</h1>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label>
              Account:{' '}
              <select
                value={accountFilter}
                onChange={(e) =>
                  setAccountFilter(e.target.value as 'all' | string)
                }
              >
                <option value="all">All accounts</option>
                {/* later: fill with real accounts from API */}
              </select>
            </label>
          </div>

          <div>
            <label>
              Import CSV:{' '}
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleCsvChange}
              />
            </label>
          </div>
        </div>

        {isLoading && <p>Loading trades…</p>}

        {isError && (
          <p style={{ color: 'red' }}>
            Error loading trades:{' '}
            {error instanceof Error ? error.message : String(error)}
          </p>
        )}

        {data && trades.length === 0 && <p>No trades yet.</p>}

        {data && trades.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Symbol</th>
                  <th>Side</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Fee</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t) => {
                  const total = t.quantity * t.price + t.fee;
                  return (
                    <tr key={t.id}>
                      <td>{new Date(t.date).toLocaleDateString()}</td>
                      <td>{t.accountName ?? t.accountId}</td>
                      <td>{t.assetSymbol}</td>
                      <td>{t.side}</td>
                      <td>{t.quantity}</td>
                      <td>{t.price}</td>
                      <td>{t.fee}</td>
                      <td>{total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Simple pagination */}
            <div style={{ marginTop: '12px' }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              <span style={{ margin: '0 8px' }}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </AppShell>
  );
}
