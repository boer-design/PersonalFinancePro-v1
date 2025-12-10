import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { ImportTradesDto } from './dto/import-trades.dto';
import { AssetType, TradeSide } from '@prisma/client';

@Injectable()
export class TradesService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureAccountOwnedByUser(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account || account.userId !== userId) {
      throw new ForbiddenException('Account does not belong to this user');
    }

    return account;
  }

  async create(userId: string, dto: CreateTradeDto) {
    await this.ensureAccountOwnedByUser(userId, dto.accountId);

    const asset = await this.prisma.asset.findUnique({
      where: { id: dto.assetId },
    });

    if (!asset) {
      throw new ForbiddenException('Asset not found');
    }

    return this.prisma.trade.create({
      data: {
        userId,
        accountId: dto.accountId,
        assetId: dto.assetId,
        date: new Date(dto.date),
        side: dto.side as TradeSide,
        quantity: dto.quantity,
        price: dto.price,
        fee: dto.fee ?? 0,
      },
      include: { asset: true, account: true },
    });
  }

  async findForAccount(userId: string, accountId?: string) {
    const where: any = { userId };
    if (accountId) {
      where.accountId = accountId;
    }

    const trades = await this.prisma.trade.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        asset: true,
        account: true,
      },
    });

    return trades;
  }

  async findOne(userId: string, id: string) {
    const trade = await this.prisma.trade.findUnique({
      where: { id },
      include: { asset: true, account: true },
    });

    if (!trade || trade.userId !== userId) {
      throw new ForbiddenException();
    }

    return trade;
  }

  async remove(userId: string, id: string) {
    const trade = await this.prisma.trade.findUnique({ where: { id } });
    if (!trade || trade.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.trade.delete({ where: { id } });
  }

  /**
   * Import trades from CSV-parsed rows.
   * - ensures account belongs to user
   * - ensures asset exists (create if needed)
   */
  async importTrades(userId: string, dto: ImportTradesDto) {
    const account = await this.ensureAccountOwnedByUser(
      userId,
      dto.accountId,
    );

    const createdTrades = [];

    for (const row of dto.trades) {
      const {
        symbol,
        name,
        date,
        side,
        quantity,
        price,
        fee,
        assetType,
        currency,
      } = row;

      const resolvedAssetType = assetType ?? AssetType.STOCK;
      const resolvedCurrency = currency ?? account.currency ?? null;
      const resolvedName = name ?? symbol;

      const existingAsset = await this.prisma.asset.findUnique({
        where: { symbol },
      });

      const shouldUpdateCurrency =
        (currency !== undefined || !existingAsset?.currency) &&
        !!resolvedCurrency;

      // find or create asset by symbol
      const asset = await this.prisma.asset.upsert({
        where: { symbol },
        update: {
          ...(name ? { name: resolvedName } : {}),
          ...(assetType ? { assetType: resolvedAssetType } : {}),
          ...(shouldUpdateCurrency ? { currency: resolvedCurrency } : {}),
        },
        create: {
          symbol,
          assetType: resolvedAssetType,
          // Use the CSV-provided name if it exists, otherwise fall back to symbol
          name: resolvedName,
          currency: resolvedCurrency,
        },
      });
      

      const trade = await this.prisma.trade.create({
        data: {
          userId,
          accountId: dto.accountId,
          assetId: asset.id,
          date: new Date(date),
          side: side as TradeSide,
          quantity,
          price,
          fee,
        },
        include: { asset: true, account: true },
      });

      createdTrades.push(trade);
    }

    return { count: createdTrades.length, trades: createdTrades };
  }
}
