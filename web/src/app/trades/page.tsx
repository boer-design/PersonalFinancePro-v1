'use client';

import React, {
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import Papa from 'papaparse';

import AppShell from '../components/AppShell';
import { useApi } from '../lib/api';
import { useAuth } from '../lib/auth';
import { Button, Select, Table } from '../components/ui';

// ---- Types ----

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
  date: string; // ISO string
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

// ---- Toast component ----

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

// ---- Radix Dialog (direct) ----

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({
  open,
  title,
  description = 'Dialog',
  onClose,
  children,
}: ModalProps) {
  // Debug helper: log open state to confirm toggle
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[Import Modal] open:', open);
  }, [open]);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 2000,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(6px)',
  };

  const contentStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 2001,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(640px, calc(100vw - 32px))',
    maxHeight: '80vh',
    overflowY: 'auto',
    border: '1px solid #334155',
    borderRadius: 16,
    backgroundColor: '#0f172a',
    boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay style={overlayStyle} />
        <Dialog.Content style={contentStyle}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <Dialog.Title className="text-lg font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              {description}
            </Dialog.Description>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-sm px-2 py-1 rounded hover:bg-slate-800"
                aria-label="Close"
              >
                ✕
              </button>
            </Dialog.Close>
          </div>
          <div className="px-4 py-4 space-y-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ---- Page ----

export default function TradesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const api = useApi();
  const queryClient = useQueryClient();

  // pagination + filter
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [accountFilter, setAccountFilter] = useState<string>(''); // '' = all

  // modal state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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

  // CSV + toast state
  const [parsedRows, setParsedRows] =
    useState<ImportTradeRow[] | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvFileName, setCsvFileName] = useState('');
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

  useEffect(() => {
    if (!authLoading && !user) {
      // layout/login handles redirect; keep hooks stable
    }
  }, [authLoading, user]);

  // --- Accounts query ---
  const {
    data: accounts,
    isLoading: accountsLoading,
    isError: accountsError,
  } = useQuery({
    queryKey: ['accounts'],
    enabled: !!token,
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
    enabled: !!token,
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (accountFilter) params.set('accountId', accountFilter);
      return api.get<TradesResponse>(`/trades?${params.toString()}`);
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
        error?.message ?? 'Failed to create account. Please try again.',
      );
      showToast('Failed to create account.', 'error');
    },
  });

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
      setCsvFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsImportModalOpen(false);
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
      setCsvFileName('');
      e.target.value = '';
      return;
    }

    setCsvFileName(file.name);
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
          setCsvFileName('');
          return;
        }

        setParsedRows(rows);
        setCsvError(null);
      },
      error: (error) => {
        console.error(error);
        setCsvError('Failed to parse CSV file.');
        setParsedRows(null);
        setCsvFileName('');
      },
    });
  };

  const handleUploadClick = () => {
    if (!selectedAccountIdForImport) {
      setCsvError('Please select an account before importing trades.');
      return;
    }

    setCsvError(null);
    fileInputRef.current?.click();
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

  const getSymbol = (trade: Trade) =>
    (trade as any).assetSymbol ??
    (trade as any).asset?.symbol ??
    trade.assetSymbol ??
    '';

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      if (selectedAccountIdForImport !== '') {
        setSelectedAccountIdForImport('');
      }
      return;
    }
    if (!selectedAccountIdForImport) {
      setSelectedAccountIdForImport(accounts[0].id);
    }
  }, [accounts, selectedAccountIdForImport]);

  // ---------- Render ----------

  return (
    <AppShell>
      <div className="py-6 space-y-6">
        {/* Heading */}
        <section>
          <h1 className="text-3xl font-semibold">Trades</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Manage and review your executed trades across accounts.
          </p>
        </section>

        {/* Trades table */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Select
                label="Account filter"
                placeholder="All accounts"
                value={accountFilter || 'ALL_ACCOUNTS'}
                onValueChange={(v) => {
                  setAccountFilter(v === 'ALL_ACCOUNTS' ? '' : v);
                  setPage(1);
                }}
                disabled={accountsLoading || accountsError}
                options={[
                  { value: 'ALL_ACCOUNTS', label: 'All accounts' },
                  ...(accounts ?? []).map((acc) => ({
                    value: acc.id,
                    label: `${acc.name} (${acc.currency}${acc.type ? ` • ${acc.type}` : ''})`,
                  })),
                ]}
              />
              {accountsError && (
                <p className="text-xs text-red-500 mt-1">
                  Failed to load accounts.
                </p>
              )}
            </div>

            <Button
              appearance="secondary"
              tone="purple"
              onClick={() => {
                setIsImportModalOpen(true);
                setCsvError(null);
                setParsedRows(null);
                setCsvFileName('');
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              Import CSV
            </Button>
          </div>

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
                <Table>
                  <Table.Head>
                    <Table.HeadRow>
                      <Table.HeaderCell>
                        <Table.ColumnTitle>Date</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Table.ColumnTitle>Account</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Table.ColumnTitle>Symbol</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Table.ColumnTitle>Side</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell align="right">
                        <Table.ColumnTitle align="right">Quantity</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell align="right">
                        <Table.ColumnTitle align="right">Price</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell align="right">
                        <Table.ColumnTitle align="right">Fee</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell align="right">
                        <Table.ColumnTitle align="right">Total</Table.ColumnTitle>
                      </Table.HeaderCell>
                    </Table.HeadRow>
                  </Table.Head>
                  <Table.Body>
                    {trades.map((t) => {
                      const total = t.quantity * t.price + t.fee;
                      return (
                        <Table.Row key={t.id}>
                          <Table.Cell>
                            {new Date(t.date).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>{t.accountName || getAccountName(t.accountId)}</Table.Cell>
                          <Table.Cell>{getSymbol(t) || '—'}</Table.Cell>
                          <Table.Cell>{t.side}</Table.Cell>
                          <Table.Cell align="right">
                            {t.quantity.toLocaleString()}
                          </Table.Cell>
                          <Table.Cell align="right">{t.price.toFixed(2)}</Table.Cell>
                          <Table.Cell align="right">{t.fee.toFixed(2)}</Table.Cell>
                          <Table.Cell align="right">{total.toFixed(2)}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div>
              Page {page} of {totalPages}
            </div>
            <div className="space-x-2">
              <Button
                appearance="secondary"
                tone="neutral"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </Button>
              <Button
                appearance="secondary"
                tone="neutral"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      {/* Import CSV Modal */}
      <Modal
        open={isImportModalOpen}
        title="Import trades from CSV"
        description="Choose an account, optionally create one, then upload a CSV of trades to import."
        onClose={() => {
          if (!importTradesMutation.isPending) {
            setIsImportModalOpen(false);
            setCsvError(null);
            setParsedRows(null);
            setCsvFileName('');
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }
        }}
      >
        <div className="space-y-4">
          {/* Choose account */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Import into account
            </label>
            {(accounts?.length ?? 0) === 0 ? (
              <div className="text-xs text-slate-400">
                No accounts yet. Create one to import trades.
              </div>
            ) : (
              <Select
                placeholder="Select an account..."
                value={selectedAccountIdForImport}
                onValueChange={setSelectedAccountIdForImport}
                disabled={accountsLoading || accountsError}
                options={(accounts ?? []).map((acc) => ({
                  value: acc.id,
                  label: `${acc.name} (${acc.currency}${acc.type ? ` • ${acc.type}` : ''})`,
                }))}
              />
            )}
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
              <Button
                appearance="secondary"
                tone="neutral"
                size="sm"
                type="submit"
                disabled={createAccountMutation.isPending}
              >
                {createAccountMutation.isPending ? 'Creating...' : 'Create account'}
              </Button>
            </form>
          </div>

          {/* CSV upload + confirm import */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              CSV file
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleCsvChange}
              className="hidden"
              disabled={importTradesMutation.isPending}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button
                appearance="secondary"
                tone="purple"
                size="sm"
                type="button"
                onClick={handleUploadClick}
                disabled={importTradesMutation.isPending}
              >
                {importTradesMutation.isPending ? 'Working...' : 'Upload CSV'}
              </Button>
              {csvFileName && (
                <span className="text-xs text-slate-300">
                  Selected: {csvFileName}
                </span>
              )}
              {parsedRows && (
                <span className="text-xs text-slate-300">
                  Parsed {parsedRows.length} trade
                  {parsedRows.length === 1 ? '' : 's'}.
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              The CSV should include at least date, symbol, side, quantity,
              and price columns.
            </p>
            {csvError && (
              <p className="text-xs text-red-500">{csvError}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              appearance="primary"
              tone="purple"
              type="button"
              onClick={handleConfirmImport}
              disabled={
                importTradesMutation.isPending ||
                !parsedRows ||
                parsedRows.length === 0
              }
            >
              {importTradesMutation.isPending
                ? 'Importing...'
                : parsedRows
                ? `Import ${parsedRows.length} trades`
                : 'Import trades'}
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
