'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth';
import { useApi } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Card,
  Flex,
  Heading,
  Table,
  Text,
  Button,
} from '@radix-ui/themes';
import { AppShell } from '../../components/AppShell';

type Holding = {
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
  holdings: Holding[];
  totals: {
    totalQuantity: number;
    realizedPnl: number;
    totalMarketValue: number;
    unrealizedPnl: number;
  };
};

export default function AccountHoldingsPage() {
  const router = useRouter();
  const params = useParams<{ accountId: string }>();
  const { token } = useAuth();
  const { request } = useApi();

  const accountId = params.accountId;

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token, router]);

  const holdingsQuery = useQuery({
    queryKey: ['account-holdings', accountId],
    queryFn: () =>
      request<HoldingsResponse>(`/holdings?accountId=${accountId}`),
    enabled: !!token && !!accountId,
  });

  if (!token) return null;

  const data = holdingsQuery.data;
  const totals = data?.totals;

  return (
    <AppShell title="Account holdings">
      <Flex direction="column" gap="4">
        <Button
          variant="ghost"
          color="gray"
          size="1"
          onClick={() => router.push('/')}
        >
          ← Back to dashboard
        </Button>

        {/* Summary cards */}
        <Flex gap="3" wrap="wrap">
          <Card style={{ minWidth: 220 }}>
            <Text size="1" color="gray">
              Market value
            </Text>
            <Heading size="4" mt="1">
              {totals
                ? `€${totals.totalMarketValue.toFixed(2)}`
                : 'Loading…'}
            </Heading>
          </Card>

          <Card style={{ minWidth: 220 }}>
            <Text size="1" color="gray">
              Realized P/L
            </Text>
            <Heading
              size="4"
              mt="1"
              color={
                totals && totals.realizedPnl >= 0 ? 'green' : 'red'
              }
            >
              {totals
                ? `€${totals.realizedPnl.toFixed(2)}`
                : 'Loading…'}
            </Heading>
          </Card>

          <Card style={{ minWidth: 220 }}>
            <Text size="1" color="gray">
              Unrealized P/L
            </Text>
            <Heading
              size="4"
              mt="1"
              color={
                totals && totals.unrealizedPnl >= 0 ? 'green' : 'red'
              }
            >
              {totals
                ? `€${totals.unrealizedPnl.toFixed(2)}`
                : 'Loading…'}
            </Heading>
          </Card>
        </Flex>

        {/* Holdings table */}
        <Box>
          <Heading size="2" mb="2">
            Positions in this account
          </Heading>
          <Card>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Symbol</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Qty
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Avg buy
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Current price
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Market value
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Realized P/L
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Unrealized P/L
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.holdings.map((h) => (
                  <Table.Row key={h.assetId}>
                    <Table.RowHeaderCell>{h.symbol}</Table.RowHeaderCell>
                    <Table.Cell>{h.name}</Table.Cell>
                    <Table.Cell align="right">{h.quantity}</Table.Cell>
                    <Table.Cell align="right">
                      €{h.avgBuyPrice.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell align="right">
                      {h.currentPrice != null
                        ? `€${h.currentPrice.toFixed(2)}`
                        : '—'}
                    </Table.Cell>
                    <Table.Cell align="right">
                      {h.marketValue != null
                        ? `€${h.marketValue.toFixed(2)}`
                        : '—'}
                    </Table.Cell>
                    <Table.Cell
                      align="right"
                      style={{
                        color:
                          h.realizedPnl > 0
                            ? 'var(--green-11)'
                            : h.realizedPnl < 0
                            ? 'var(--red-11)'
                            : undefined,
                      }}
                    >
                      €{h.realizedPnl.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell
                      align="right"
                      style={{
                        color:
                          (h.unrealizedPnl ?? 0) > 0
                            ? 'var(--green-11)'
                            : (h.unrealizedPnl ?? 0) < 0
                            ? 'var(--red-11)'
                            : undefined,
                      }}
                    >
                      {h.unrealizedPnl != null
                        ? `€${h.unrealizedPnl.toFixed(2)}`
                        : '—'}
                    </Table.Cell>
                  </Table.Row>
                ))}

                {!data?.holdings.length && (
                  <Table.Row>
                    <Table.Cell colSpan={8}>
                      <Text size="2" color="gray">
                        No holdings yet.
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          </Card>
        </Box>
      </Flex>
    </AppShell>
  );
}
