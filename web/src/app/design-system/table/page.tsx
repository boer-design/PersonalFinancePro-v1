"use client";

import { useMemo, useState } from "react";
import { Table } from "../../components/ui";
import type { SortDirection } from "../../components/ui/data/table/Table";
import { tokens } from "../../components/ui/theme/tokens";

type Position = {
  symbol: string;
  name: string;
  allocation: number;
  shares: number;
  price: number;
  dayChange: number;
  pnl: number;
};

const surfaceCardStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 16,
  background: "#1b181b",
} as const;

const positions: Position[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    allocation: 24.1,
    shares: 120,
    price: 191.24,
    dayChange: 1.2,
    pnl: 4820.12,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    allocation: 19.8,
    shares: 85,
    price: 374.21,
    dayChange: -0.64,
    pnl: 3120.45,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    allocation: 16.3,
    shares: 42,
    price: 459.12,
    dayChange: 2.1,
    pnl: 6284.32,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    allocation: 12.5,
    shares: 95,
    price: 146.51,
    dayChange: 0.48,
    pnl: 1640.28,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    allocation: 11.2,
    shares: 60,
    price: 133.77,
    dayChange: -0.22,
    pnl: 910.5,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    allocation: 9.6,
    shares: 40,
    price: 244.08,
    dayChange: -1.8,
    pnl: -720.19,
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export default function TablePage() {
  const [sortState, setSortState] = useState<{
    key: keyof Position;
    direction: SortDirection;
  }>({
    key: "allocation",
    direction: "desc",
  });

  const handleSort = (key: keyof Position) => {
    setSortState((prev) => {
      if (prev.key === key) {
        const nextDirection = prev.direction === "asc" ? "desc" : "asc";
        return { key, direction: nextDirection };
      }

      return { key, direction: "desc" };
    });
  };

  const sortedRows = useMemo(() => {
    const rows = [...positions].sort((a, b) => {
      const valueA = a[sortState.key];
      const valueB = b[sortState.key];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB);
      }

      return (valueA as number) - (valueB as number);
    });

    return sortState.direction === "desc" ? rows.reverse() : rows;
  }, [sortState]);

  const positive = tokens.palette.blue400;
  const negative = tokens.palette.red400;

  const columnTitleProps = (key: keyof Position) => ({
    sortable: true,
    sortDirection: sortState.key === key ? sortState.direction : null,
    onClick: () => handleSort(key),
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <header>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Table</h1>
        <p style={{ color: "#cbd5e1", fontSize: 14 }}>
          Branded table wrapper with hover states, rounded corners, and optional
          sortable headers.
        </p>
      </header>

      <section style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 4 }}>
              Portfolio positions
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 13 }}>
              Sorting toggles between ascending and descending when you click a
              column title.
            </p>
          </div>
          <div style={{ textAlign: "right", color: "#94a3b8", fontSize: 12 }}>
            Demo data refreshed on load
          </div>
        </div>

        <div style={surfaceCardStyle}>
          <Table aria-label="Portfolio positions table">
            <Table.Head>
              <Table.HeadRow>
                <Table.HeaderCell>
                  <Table.ColumnTitle {...columnTitleProps("symbol")}>
                    Symbol
                  </Table.ColumnTitle>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Table.ColumnTitle {...columnTitleProps("name")}>
                    Company
                  </Table.ColumnTitle>
                </Table.HeaderCell>
                <Table.HeaderCell align="right">
                  <Table.ColumnTitle {...columnTitleProps("allocation")} align="right">
                    Allocation
                  </Table.ColumnTitle>
                </Table.HeaderCell>
                <Table.HeaderCell align="right">
                  <Table.ColumnTitle {...columnTitleProps("shares")} align="right">
                    Shares
                  </Table.ColumnTitle>
                </Table.HeaderCell>
                <Table.HeaderCell align="right">
                  <Table.ColumnTitle {...columnTitleProps("price")} align="right">
                    Last price
                  </Table.ColumnTitle>
                </Table.HeaderCell>
                <Table.HeaderCell align="right">
                  <Table.ColumnTitle {...columnTitleProps("dayChange")} align="right">
                    Day move
                  </Table.ColumnTitle>
                </Table.HeaderCell>
                <Table.HeaderCell align="right">
                  <Table.ColumnTitle {...columnTitleProps("pnl")} align="right">
                    Total P&amp;L
                  </Table.ColumnTitle>
                </Table.HeaderCell>
              </Table.HeadRow>
            </Table.Head>

            <Table.Body>
              {sortedRows.map((row) => (
                <Table.Row key={row.symbol}>
                  <Table.Cell style={{ fontWeight: 700 }}>
                    {row.symbol}
                  </Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell align="right">
                    {percentFormatter.format(row.allocation)}%
                  </Table.Cell>
                  <Table.Cell align="right">{row.shares}</Table.Cell>
                  <Table.Cell align="right">
                    {currencyFormatter.format(row.price)}
                  </Table.Cell>
                  <Table.Cell
                    align="right"
                    style={{
                      color: row.dayChange >= 0 ? positive : negative,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {row.dayChange >= 0 ? "+" : ""}
                    {percentFormatter.format(row.dayChange)}%
                  </Table.Cell>
                  <Table.Cell
                    align="right"
                    style={{
                      color: row.pnl >= 0 ? positive : negative,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {currencyFormatter.format(row.pnl)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </section>
    </div>
  );
}
