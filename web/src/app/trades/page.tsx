"use client";

import React, {
  useState,
  useMemo,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from 'react';
import {
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import Papa from 'papaparse';

import AppShell from '../components/AppShell';
import { useApi } from '../lib/api';
import { useAuth } from '../lib/auth';
import { Button, Dialog, InputField, Select, Table } from '../components/ui';

// ---- Types ----

export type TradeSide = 'BUY' | 'SELL';

type AssetType = 'STOCK' | 'ETF' | 'CRYPTO' | 'OTHER';

type TradeAsset = {
  id?: string;
  symbol?: string;
  name?: string | null;
  assetType?: AssetType;
  currency?: string | null;
};

type TradeAccount = {
  id?: string;
  name?: string | null;
  currency?: string | null;
  type?: string | null;
};

type Trade = {
  id: string;
  accountId: string;
  accountName?: string | null;
  assetId?: string;
  assetSymbol?: string;
  assetName?: string | null;
  assetType?: AssetType;
  assetCurrency?: string | null;
  asset?: TradeAsset;
  account?: TradeAccount;
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
  name?: string;
  assetType?: AssetType;
  currency?: string;
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

const CREATE_ACCOUNT_OPTION_VALUE = 'CREATE_NEW_ACCOUNT';

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
            {toast.type === 'success' ? '?' : '??'}
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

// ---- Helpers ----

const normalizeAssetType = (raw?: string): AssetType => {
  const value = String(raw ?? '').trim().toUpperCase();
  if (value === 'ETF') return 'ETF';
  if (value === 'CRYPTO' || value === 'CRYPTOCURRENCY') return 'CRYPTO';
  if (value === 'OTHER') return 'OTHER';
  return 'STOCK';
};

const normalizeCurrency = (raw?: string) => {
  if (!raw) return undefined;
  return String(raw).trim().toUpperCase();
};

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
  const [
    isCreateAccountDialogOpen,
    setIsCreateAccountDialogOpen,
  ] = useState(false);

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
      setNewAccountType('BROKERAGE');
      setNewAccountCurrency('EUR');
      setIsCreateAccountDialogOpen(false);
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

      const targetAccount = accounts?.find(
        (acc) => acc.id === selectedAccountIdForImport,
      );

      return api.post('/trades/import', {
        accountId: selectedAccountIdForImport,
        trades: rows.map((row) => ({
          date: row.date,
          symbol: row.symbol,
          name: row.name,
          side: row.side,
          quantity: row.quantity,
          price: row.price,
          fee: row.fee ?? 0,
          assetType: row.assetType ?? 'STOCK',
          currency: row.currency ?? targetAccount?.currency,
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

          const parsedAssetType = normalizeAssetType(
            (raw as any).assetType ?? (raw as any).type,
          );
          const parsedCurrency = normalizeCurrency((raw as any).currency);

          rows.push({
            date: new Date(raw.date).toISOString(),
            symbol: String(raw.symbol).trim(),
            name: raw.name ? String(raw.name).trim() : undefined,
            side:
              String(raw.side).toUpperCase() === 'SELL'
                ? 'SELL'
                : 'BUY',
            quantity: Number(raw.quantity),
            price: Number(raw.price),
            fee: raw.fee ? Number(raw.fee) : 0,
            assetType: parsedAssetType,
            currency: parsedCurrency,
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

    setAccountFormError(null);
    createAccountMutation.mutate({
      name: newAccountName.trim(),
      type: newAccountType.trim() || 'BROKERAGE',
      currency: newAccountCurrency.trim() || 'EUR',
    });
  };

  const openCreateAccountDialog = () => {
    setAccountFormError(null);
    setIsCreateAccountDialogOpen(true);
  };

  const closeCreateAccountDialog = () => {
    if (!createAccountMutation.isPending) {
      setIsCreateAccountDialogOpen(false);
      setAccountFormError(null);
    }
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

  const getAccountCurrency = (accountId: string) =>
    accounts?.find((a) => a.id === accountId)?.currency;

  const getSymbol = (trade: Trade) =>
    trade.asset?.symbol ??
    (trade as any).asset?.symbol ??
    trade.assetSymbol ??
    (trade as any).assetSymbol ??
    '';

  const getAssetType = (trade: Trade): AssetType =>
    ((trade.asset?.assetType ??
      (trade as any).asset?.assetType ??
      trade.assetType ??
      (trade as any).assetType) ?? 'STOCK') as AssetType;

  const getAssetCurrency = (trade: Trade) =>
    trade.asset?.currency ??
    (trade as any).asset?.currency ??
    trade.assetCurrency ??
    (trade as any).assetCurrency ??
    (trade as any).currency ??
    getAccountCurrency(trade.accountId) ??
    '-';

  const resetImportState = () => {
    setCsvError(null);
    setParsedRows(null);
    setCsvFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openImportDialog = () => {
    setIsImportModalOpen(true);
    resetImportState();
  };

  const closeImportDialog = () => {
    if (!importTradesMutation.isPending) {
      setIsImportModalOpen(false);
      setIsCreateAccountDialogOpen(false);
      resetImportState();
    }
  };

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

  const accountOptions =
    (accounts ?? []).map((acc) => ({
      value: acc.id,
      label: `${acc.name} (${acc.currency}${acc.type ? ` - ${acc.type}` : ''})`,
    })) || [];

  const handleAccountSelect = (value: string) => {
    if (value === CREATE_ACCOUNT_OPTION_VALUE) {
      openCreateAccountDialog();
      return;
    }
    setSelectedAccountIdForImport(value);
  };

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
                    label: `${acc.name} (${acc.currency}${acc.type ? ` - ${acc.type}` : ''})`,
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
              onClick={openImportDialog}
            >
              Import CSV
            </Button>
          </div>

          <div className="border border-slate-700 rounded-xl overflow-hidden">
            {tradesLoading ? (
              <div className="p-4">Loading trades...</div>
            ) : tradesError ? (
              <div className="p-4 text-red-500">
                Error loading trades{' '}
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
                        <Table.ColumnTitle>Asset Type</Table.ColumnTitle>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Table.ColumnTitle>Currency</Table.ColumnTitle>
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
                          <Table.Cell>{getSymbol(t) || '-'}</Table.Cell>
                          <Table.Cell>{getAssetType(t)}</Table.Cell>
                          <Table.Cell>{getAssetCurrency(t)}</Table.Cell>
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

      {/* Import CSV Dialog */}
      <Dialog
        open={isImportModalOpen}
        onOpenChange={(next) => {
          if (!next) {
            closeImportDialog();
          } else {
            setIsImportModalOpen(true);
          }
        }}
      >
        <Dialog.Content
          tone="purple"
          className="bg-slate-950 border border-slate-800 text-slate-50 shadow-2xl"
          title="Import trades from CSV"
          description={null}
        >
          <Dialog.Body className="space-y-6">
            <div className="space-y-2">
              <Select
                label="Select account"
                placeholder="Select an account"
                value={selectedAccountIdForImport}
                onValueChange={handleAccountSelect}
                disabled={accountsLoading}
                options={[
                  ...accountOptions,
                  {
                    value: CREATE_ACCOUNT_OPTION_VALUE,
                    label: '+ Create new account',
                  },
                ]}
              />
              {accountsError ? (
                <p className="text-xs text-red-500 mt-1">
                  Failed to load accounts.
                </p>
              ) : null}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-100">
                CSV file
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleCsvChange}
                style={{ display: 'none' }}
                disabled={importTradesMutation.isPending}
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  appearance="secondary"
                  tone="purple"
                  size="md"
                  type="button"
                  onClick={handleUploadClick}
                  disabled={importTradesMutation.isPending}
                >
                  {importTradesMutation.isPending ? 'Working...' : 'Upload CSV'}
                </Button>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  {csvFileName ? (
                    <span className="px-2 py-1 rounded-lg border border-slate-800 bg-slate-900">
                      Selected: {csvFileName}
                    </span>
                  ) : null}
                  {parsedRows ? (
                    <span className="px-2 py-1 rounded-lg border border-purple-800 bg-purple-900/30 text-purple-100">
                      {parsedRows.length} parsed
                    </span>
                  ) : null}
                </div>
              </div>
              {csvError && (
                <p className="text-xs text-red-500">{csvError}</p>
              )}
            </div>
          </Dialog.Body>

          <Dialog.Footer className="justify-between">
            <div className="text-xs text-slate-400">
              {parsedRows
                ? `Ready to import ${parsedRows.length} trade${parsedRows.length === 1 ? '' : 's'}.`
                : 'Upload a CSV to preview before importing.'}
            </div>
            <div className="flex items-center gap-2">
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
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <Dialog
        open={isCreateAccountDialogOpen}
        onOpenChange={(next) => {
          if (!next) {
            closeCreateAccountDialog();
          } else {
            setIsCreateAccountDialogOpen(true);
          }
        }}
      >
        <Dialog.Content
          tone="purple"
          className="bg-slate-950 border border-slate-800 text-slate-50 shadow-2xl"
          title="Create a new account"
          description="Add a trading account to import your CSV into."
        >
          <form className="space-y-6" onSubmit={handleCreateAccountSubmit}>
            <Dialog.Body className="space-y-4">
              <InputField
                label="Account name"
                placeholder="e.g. Interactive Brokers"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
                status={accountFormError ? 'error' : 'default'}
                supportingText={accountFormError ?? undefined}
                disabled={createAccountMutation.isPending}
                fullWidth
              />
              
              <InputField
                  label="Type"
                  placeholder="BROKERAGE"
                  value={newAccountType}
                  onChange={(e) => setNewAccountType(e.target.value)}
                  disabled={createAccountMutation.isPending}
                  className="flex-1"
                  fullWidth
                />
                
                  <InputField
                    label="Currency"
                    placeholder="EUR"
                    value={newAccountCurrency}
                    onChange={(e) => setNewAccountCurrency(e.target.value)}
                    disabled={createAccountMutation.isPending}
                    fullWidth
                  />
               
            </Dialog.Body>
            <Dialog.Footer className="justify-between">
              <Button
                appearance="secondary"
                tone="neutral"
                type="button"
                onClick={closeCreateAccountDialog}
                disabled={createAccountMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                tone="purple"
                type="submit"
                disabled={createAccountMutation.isPending}
              >
                {createAccountMutation.isPending ? 'Creating...' : 'Create account'}
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog>
    </AppShell>
  );
}


