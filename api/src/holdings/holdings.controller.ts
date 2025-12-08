import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { HoldingsService } from './holdings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('portfolio')
export class HoldingsController {
  constructor(private readonly holdingsService: HoldingsService) {}

  // GET /portfolio/summary  -> dashboard
  @Get('summary')
  getSummary(@Req() req: any) {
    const userId = req.user.userId;
    return this.holdingsService.getPortfolioSummary(userId);
  }

  // GET /portfolio/account/:accountId/holdings
  @Get('account/:accountId/holdings')
  getHoldingsForAccount(@Req() req: any, @Param('accountId') accountId: string) {
    const userId = req.user.userId;
    return this.holdingsService.getHoldingsForAccount(userId, accountId);
  }

  // GET /portfolio/assets/performance
  @Get('assets/performance')
  getAssetPerformance(@Req() req: any) {
    const userId = req.user.userId;
    return this.holdingsService.getAssetPerformance(userId);
  }
}
