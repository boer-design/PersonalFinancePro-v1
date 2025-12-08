import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Trade } from '@prisma/client';

interface Position {
  assetId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  realizedPnl: number;
  currentPrice: number | null;
  marketValue: number | null;
  unrealizedPnl: number | null;
}

@Injectable()
export class HoldingsService {
  constructor(private readonly prisma: PrismaService) {}

  private computePosition(trades: Trade[], assetMeta: { symbol: string; name: string }): Position {
    // trades already filtered to one asset, sorted by date
    let qty = 0;
    let totalCost = 0; // running cost basis of open position
    let realizedPnl = 0;
    let lastPrice = 0;

    for (const t of trades) {
      lastPrice = t.price;
      if (t.side === 'BUY') {
        qty += t.quantity;
        totalCost += t.quantity * t.price + t.fee;
      } else {
        // SELL
        const avgCost = qty === 0 ? t.price : totalCost / qty;
        const proceeds = t.quantity * t.price - t.fee;
        const costOfSold = avgCost * t.quantity;
        realizedPnl += proceeds - costOfSold;

        qty -= t.quantity;
        totalCost -= costOfSold;
      }
    }

    const avgBuyPrice = qty > 0 ? totalCost / qty : 0;
    const currentPrice = qty > 0 ? lastPrice : null;
    const marketValue = currentPrice !== null ? qty * currentPrice : null;
    const unrealizedPnl =
      marketValue !== null ? marketValue - totalCost : null;

    return {
      assetId: trades[0].assetId,
      symbol: assetMeta.symbol,
      name: assetMeta.name,
      quantity: qty,
      avgBuyPrice,
      realizedPnl,
      currentPrice,
      marketValue,
      unrealizedPnl,
    };
  }

  /**
   * Detailed holdings for a single account.
   * Shape similar to what you pasted earlier.
   */
  async getHoldingsForAccount(userId: string, accountId: string) {
    const trades = await this.prisma.trade.findMany({
      where: { userId, accountId },
      orderBy: { date: 'asc' },
      include: { asset: true },
    });

    if (trades.length === 0) {
      return {
        accountId,
        holdings: [],
        totals: {
          totalQuantity: 0,
          realizedPnl: 0,
          totalMarketValue: 0,
          unrealizedPnl: 0,
        },
      };
    }

    const byAsset = new Map<string, Trade[]>();
    const assetMeta = new Map<string, { symbol: string; name: string }>();

    for (const t of trades) {
      if (!byAsset.has(t.assetId)) byAsset.set(t.assetId, []);
      byAsset.get(t.assetId)!.push(t);
      assetMeta.set(t.assetId, {
        symbol: t.asset.symbol,
        name: t.asset.name,
      });
    }

    const holdings: Position[] = [];
    let totalQty = 0;
    let totalMarketValue = 0;
    let totalRealized = 0;
    let totalUnrealized = 0;

    for (const [assetId, assetTrades] of byAsset.entries()) {
      const pos = this.computePosition(assetTrades, assetMeta.get(assetId)!);
      holdings.push(pos);

      totalQty += pos.quantity;
      totalRealized += pos.realizedPnl;
      if (pos.marketValue !== null) {
        totalMarketValue += pos.marketValue;
      }
      if (pos.unrealizedPnl !== null) {
        totalUnrealized += pos.unrealizedPnl;
      }
    }

    return {
      accountId,
      holdings,
      totals: {
        totalQuantity: totalQty,
        realizedPnl: totalRealized,
        totalMarketValue,
        unrealizedPnl: totalUnrealized,
      },
    };
  }

  /**
   * Portfolio summary grouped by account for dashboard.
   */
  async getPortfolioSummary(userId: string) {
    const trades = await this.prisma.trade.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
      include: { asset: true, account: true },
    });

    if (trades.length === 0) {
      return {
        accounts: [],
        totals: {
          totalMarketValue: 0,
          realizedPnl: 0,
          unrealizedPnl: 0,
        },
      };
    }

    const byAccount = new Map<string, typeof trades>();

    for (const t of trades) {
      if (!byAccount.has(t.accountId)) byAccount.set(t.accountId, []);
      byAccount.get(t.accountId)!.push(t);
    }

    const accountsSummary: any[] = [];
    let portfolioMarketValue = 0;
    let portfolioRealized = 0;
    let portfolioUnrealized = 0;

    for (const [accountId, accountTrades] of byAccount.entries()) {
      // group again by asset to compute positions & totals per account
      const byAsset = new Map<string, Trade[]>();
      const assetMeta = new Map<string, { symbol: string; name: string }>();

      for (const t of accountTrades) {
        if (!byAsset.has(t.assetId)) byAsset.set(t.assetId, []);
        byAsset.get(t.assetId)!.push(t);
        assetMeta.set(t.assetId, {
          symbol: t.asset.symbol,
          name: t.asset.name,
        });
      }

      let totalMarketValue = 0;
      let totalRealized = 0;
      let totalUnrealized = 0;

      for (const [assetId, assetTrades] of byAsset.entries()) {
        const pos = this.computePosition(assetTrades, assetMeta.get(assetId)!);

        totalRealized += pos.realizedPnl;
        if (pos.marketValue !== null) {
          totalMarketValue += pos.marketValue;
        }
        if (pos.unrealizedPnl !== null) {
          totalUnrealized += pos.unrealizedPnl;
        }
      }

      portfolioMarketValue += totalMarketValue;
      portfolioRealized += totalRealized;
      portfolioUnrealized += totalUnrealized;

      const anyTrade = accountTrades[0];
      accountsSummary.push({
        accountId,
        name: anyTrade.account.name,
        currency: anyTrade.account.currency,
        totals: {
          totalMarketValue,
          realizedPnl: totalRealized,
          unrealizedPnl: totalUnrealized,
        },
      });
    }

    return {
      accounts: accountsSummary,
      totals: {
        totalMarketValue: portfolioMarketValue,
        realizedPnl: portfolioRealized,
        unrealizedPnl: portfolioUnrealized,
      },
    };
  }

  /**
   * Asset-level performance across all accounts.
   */
  async getAssetPerformance(userId: string) {
    const trades = await this.prisma.trade.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
      include: { asset: true },
    });

    if (trades.length === 0) return [];

    const byAsset = new Map<string, Trade[]>();
    const assetMeta = new Map<string, { symbol: string; name: string }>();

    for (const t of trades) {
      if (!byAsset.has(t.assetId)) byAsset.set(t.assetId, []);
      byAsset.get(t.assetId)!.push(t);
      assetMeta.set(t.assetId, {
        symbol: t.asset.symbol,
        name: t.asset.name,
      });
    }

    const result: any[] = [];

    for (const [assetId, assetTrades] of byAsset.entries()) {
      const pos = this.computePosition(assetTrades, assetMeta.get(assetId)!);
      const totalCostBasis = pos.quantity > 0 ? pos.avgBuyPrice * pos.quantity : 0;

      result.push({
        assetId,
        symbol: pos.symbol,
        name: pos.name,
        quantity: pos.quantity,
        totalCostBasis,
        totalMarketValue: pos.marketValue,
        realizedPnl: pos.realizedPnl,
        unrealizedPnl: pos.unrealizedPnl,
      });
    }

    return result;
  }
}
