'use client';

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Papa from 'papaparse';
import * as Dialog from '@radix-ui/react-dialog';

import AppShell from '../components/AppShell';
import { useAuth } from '../lib/auth';
import { useApi } from '../lib/api';

// ---------- Types ----------

export type TradeSide = 'BUY' | 'SELL';

type Trade = {
  id: string;
  accountId: string;
  accountName?: string | null;
  assetSymbol: string;
  assetName?: string | null;
  date: string;
  side: TradeSide;
  quantity: number;
  price: number;
  fee: number;
};

type TradesResponse =
  | Trade[]
  | {
      trades: Trade[];
      total: number;
      page: number;
      pageSize: number;
    };

type Account = {
  id: string;
  name: string;
  type?: string | null;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

type ImportTradeRow = {
  date: string;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  fee?: number;
};

type CreateAccountPayload = {
  name: string;
  type: string;
  currency: string;
};

type ToastState = {
  message: string;
  type: 'success' | 'error';
};

// ---------- Small Toast helper ----------

function Toast({
  toast,
  onClose,
}: {
  toast: ToastState;
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg border text-sm ${
          toast.type === 'success'
            ? 'bg-emerald-900/90 border-emerald-600 text-emerald-50'
            : 'bg-red-900/90 border-red-600 text-red-50'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5">
            {toast.type === 'success' ? '✅' : '⚠️'}
          </span>
          <div>{toast.message}</div>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs opacity-75 hover:opacity-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Page ----------

export default function TradesPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const api = useApi();
  const queryClient = useQueryClient();

  // Pagination + filters
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [accountFilter, setAccountFilter] = useState<string>(''); // '' = all

  // Import modal state
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [
    selectedAccountIdForImport,
    setSelectedAccountIdForImport,
  ] = useState<string>('');
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountType, setNewAccountType] = useState('BROKERAGE');
  const [newAccountCurrency, setNewAccountCurrency] =
    useState('EUR');

  const [accountFormError, setAccountFormError] =
    useState<string | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [parsedRows, setParsedRows] =
    useState<ImportTradeRow[] | null>(null);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) =>
        current?.message === message && current.type === type
          ? null
          : current,
      );
    }, 4000);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  // --- Accounts query (inline, no extra hook) ---
  const {
    data: accounts,
    isLoading: accountsLoading,
    isError: accountsError,
  } = useQuery({
    queryKey: ['accounts'],
    enabled: !authLoading && !!token,
    queryFn: () => api.get<Account[]>('/accounts'),
  });

  // --- Trades query ---
  const {
    data: tradesResponse,
    isLoading: tradesLoading,
    isError: tradesError,
    error: tradesErrorObj,
  } = useQuery({
    queryKey: ['trades', { page, pageSize, accountId: accountFilter }],
    enabled: !authLoading && !!token,
    queryFn: () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('pageSize', String(pageSize));
      if (accountFilter) params.set('accountId', accountFilter);

      return api.get<TradesResponse>(
        `/trades?${params.toString()}`,
      );
    },
  });

  const trades: Trade[] = useMemo(() => {
    if (!tradesResponse) return [];
    if (Array.isArray(tradesResponse)) return tradesResponse;
    return tradesResponse.trades ?? [];
  }, [tradesResponse]);

  const totalPages = useMemo(() => {
    if (!tradesResponse || Array.isArray(tradesResponse)) return 1;
    if (!tradesResponse.pageSize) return 1;
    return Math.max(
      1,
      Math.ceil(tradesResponse.total / tradesResponse.pageSize),
    );
  }, [tradesResponse]);

  // --- Mutations ---

  // Create account (from modal)
  const createAccountMutation = useMutation<
    Account,
    unknown,
    CreateAccountPayload
  >({
    mutationFn: (payload) =>
      api.post<Account, CreateAccountPayload>('/accounts', payload),
    onSuccess: (account) => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      setSelectedAccountIdForImport(account.id);
      setNewAccountName('');
      setAccountFormError(null);
      showToast(`Account "${account.name}" created.`, 'success');
    },
    onError: (error: any) => {
      setAccountFormError(
        error?.message ??
          'Failed to create account. Please try again.',
      );
      showToast('Failed to create account.', 'error');
    },
  });

  // Import trades (from modal)
  const importTradesMutation = useMutation<
    unknown,
    unknown,
    ImportTradeRow[]
  >({
    mutationFn: (rows) => {
      if (!selectedAccountIdForImport) {
        throw new Error(
          'Please select an account before importing trades.',
        );
      }

      return api.post('/trades/import', {
        accountId: selectedAccountIdForImport,
        trades: rows.map((row) => ({
          date: row.date,
          symbol: row.symbol,
          side: row.side,
          quantity: row.quantity,
          price: row.price,
          fee: row.fee ?? 0,
        })),
      });
    },
    onSuccess: (_data, rows) => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      setCsvError(null);
      setParsedRows(null);
      setIsImportOpen(false);
      showToast(
        `Imported ${rows.length} trade${
          rows.length === 1 ? '' : 's'
        }.`,
        'success',
      );
    },
    onError: (error: any) => {
      setCsvError(error?.message ?? 'Failed to import trades');
      showToast('Failed to import trades.', 'error');
    },
  });

  // --- Handlers ---

  const handleCsvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!selectedAccountIdForImport) {
      setCsvError('Please select an account before importing trades.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const rows: ImportTradeRow[] = [];

        for (const raw of result.data as any[]) {
          if (
            !raw.date ||
            !raw.symbol ||
            !raw.side ||
            !raw.quantity ||
            !raw.price
          ) {
            continue;
          }

          rows.push({
            date: new Date(raw.date).toISOString(),
            symbol: String(raw.symbol).trim(),
            side:
              String(raw.side).toUpperCase() === 'SELL'
                ? 'SELL'
                : 'BUY',
            quantity: Number(raw.quantity),
            price: Number(raw.price),
            fee: raw.fee ? Number(raw.fee) : 0,
          });
        }

        if (rows.length === 0) {
          setCsvError('No valid rows found in CSV.');
          setParsedRows(null);
          return;
        }

        setParsedRows(rows);
        setCsvError(null);
      },
      error: (error) => {
        console.error(error);
        setCsvError('Failed to parse CSV file.');
        setParsedRows(null);
      },
    });
  };

  const handleCreateAccountSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newAccountName.trim()) {
      setAccountFormError('Account name is required.');
      return;
    }

    createAccountMutation.mutate({
      name: newAccountName.trim(),
      type: newAccountType.trim() || 'BROKERAGE',
      currency: newAccountCurrency.trim() || 'EUR',
    });
  };

  const handleConfirmImport = () => {
    if (!selectedAccountIdForImport) {
      setCsvError('Please select an account before importing trades.');
      return;
    }
    if (!parsedRows || parsedRows.length === 0) {
      setCsvError('No parsed rows to import. Please choose a CSV file.');
      return;
    }

    importTradesMutation.mutate(parsedRows);
  };

  const getAccountName = (accountId: string) =>
    accounts?.find((a) => a.id === accountId)?.name || accountId;

  // Ensure hooks have all run before deciding not to render
  if (authLoading || !user) {
    return null;
  }

  // ---------- Render ----------

  return (
    <AppShell>
      <div className="app-shell__main space-y-6">
        {/* Header */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Trades</h1>
            <p className="text-muted mt-1">
              Manage and review your executed trades across accounts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsImportOpen(true);
              setCsvError(null);
              setParsedRows(null);
            }}
            className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 text-sm font-medium"
          >
            Import trades (CSV)
          </button>
        </section>

        {/* Filters */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Account filter
              </label>
              <select
                className="border border-slate-700 bg-slate-900 rounded px-3 py-2 text-sm min-w-[220px]"
                value={accountFilter}
                onChange={(e) => {
                  setAccountFilter(e.target.value);
                  setPage(1);
                }}
                disabled={accountsLoading || accountsError}
              >
                <option value="">All accounts</option>
                {accounts?.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.currency}
                    {acc.type ? ` • ${acc.type}` : ''})
                  </option>
                ))}
              </select>
              {accountsError && (
                <p className="text-xs text-red-500 mt-1">
                  Failed to load accounts.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Trades table */}
        <section className="space-y-3">
          <div className="border border-slate-700 rounded-xl overflow-hidden">
            {tradesLoading ? (
              <div className="p-4">Loading trades...</div>
            ) : tradesError ? (
              <div className="p-4 text-red-500">
                Error loading trades:{' '}
                {tradesErrorObj instanceof Error
                  ? tradesErrorObj.message
                  : String(tradesErrorObj)}
              </div>
            ) : trades.length === 0 ? (
              <div className="p-4 text-sm text-slate-400">
                No trades found. Try importing a CSV.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900/80 border-b border-slate-700">
                    <tr>
                      <th>Date</th>
                      <th>Account</th>
                      <th>Symbol</th>
                      <th>Side</th>
                      <th style={{ textAlign: 'right' }}>Quantity</th>
                      <th style={{ textAlign: 'right' }}>Price</th>
                      <th style={{ textAlign: 'right' }}>Fee</th>
                      <th style={{ textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((t) => {
                      const total = t.quantity * t.price + t.fee;
                      return (
                        <tr
                          key={t.id}
                          className="border-t border-slate-700/60 hover:bg-slate-900/60"
                        >
                          <td>
                            {new Date(t.date).toLocaleDateString()}
                          </td>
                          <td>
                            {t.accountName ||
                              getAccountName(t.accountId)}
                          </td>
                          <td>{t.assetSymbol}</td>
                          <td>{t.side}</td>
                          <td style={{ textAlign: 'right' }}>
                            {t.quantity.toLocaleString()}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            {t.price.toFixed(2)}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            {t.fee.toFixed(2)}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            {total.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div>
              Page {page} of {totalPages}
            </div>
            <div className="space-x-2">
              <button
                type="button"
                className="px-3 py-1 border border-slate-600 rounded-lg disabled:opacity-50 text-xs"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="px-3 py-1 border border-slate-600 rounded-lg disabled:opacity-50 text-xs"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      {/* Import CSV Modal using Radix Dialog */}
      <Dialog.Root
        open={isImportOpen}
        onOpenChange={(open) => {
          // Don’t allow closing while import is in-flight
          if (importTradesMutation.isPending) return;
          setIsImportOpen(open);
          if (!open) {
            setCsvError(null);
            setParsedRows(null);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-w-xl w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-4 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <Dialog.Title className="text-lg font-semibold">
                Import trades from CSV
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="text-sm px-2 py-1 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </Dialog.Close>
            </div>

            {/* Choose account */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Import into account
              </label>
              <select
                className="border border-slate-700 bg-slate-900 rounded px-3 py-2 text-sm w-full"
                value={selectedAccountIdForImport}
                onChange={(e) =>
                  setSelectedAccountIdForImport(e.target.value)
                }
                disabled={accountsLoading || accountsError}
              >
                <option value="">Select an account...</option>
                {accounts?.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.currency}
                    {acc.type ? ` • ${acc.type}` : ''})
                  </option>
                ))}
              </select>
              {accountsError && (
                <p className="text-xs text-red-500 mt-1">
                  Failed to load accounts.
                </p>
              )}
            </div>

            {/* Create new account inline */}
            <div className="border border-slate-700 rounded-lg p-3 space-y-3 bg-slate-900/60">
              <h3 className="text-sm font-semibold">
                Or create a new account
              </h3>
              <form
                className="space-y-3"
                onSubmit={handleCreateAccountSubmit}
              >
                <div className="space-y-1">
                  <label className="block text-xs font-medium">
                    Account name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                    placeholder="e.g. Interactive Brokers"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="block text-xs font-medium">
                      Type
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm"
                      value={newAccountType}
                      onChange={(e) =>
                        setNewAccountType(e.target.value)
                      }
                      placeholder="BROKERAGE"
                    />
                  </div>
                  <div className="w-24 space-y-1">
                    <label className="block text-xs font-medium">
                      Currency
                    </label>
                    <input
                      type="text"
                      className="w-full border border-slate-700 bg-slate-950 rounded px-3 py-2 text-sm"
                      value={newAccountCurrency}
                      onChange={(e) =>
                        setNewAccountCurrency(e.target.value)
                      }
                      placeholder="EUR"
                    />
                  </div>
                </div>
                {accountFormError && (
                  <p className="text-xs text-red-500">
                    {accountFormError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={createAccountMutation.isPending}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 text-xs font-medium disabled:opacity-50"
                >
                  {createAccountMutation.isPending
                    ? 'Creating...'
                    : 'Create account'}
                </button>
              </form>
            </div>

            {/* CSV upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                CSV file
              </label>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleCsvChange}
                className="text-sm"
                disabled={importTradesMutation.isPending}
              />
              {parsedRows && (
                <p className="text-xs text-slate-300">
                  Parsed {parsedRows.length} trade
                  {parsedRows.length === 1 ? '' : 's'} from file.
                </p>
              )}
              <p className="text-xs text-slate-400">
                The CSV should include at least date, symbol, side,
                quantity, and price columns.
              </p>
              {csvError && (
                <p className="text-xs text-red-500">{csvError}</p>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleConfirmImport}
                disabled={
                  importTradesMutation.isPending ||
                  !parsedRows ||
                  parsedRows.length === 0
                }
                className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 text-sm font-medium disabled:opacity-50"
              >
                {importTradesMutation.isPending
                  ? 'Importing...'
                  : parsedRows
                  ? `Import ${parsedRows.length} trades`
                  : 'Import trades'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </AppShell>
  );
}
