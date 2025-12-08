import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    Param,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { TradesService } from './trades.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CreateTradeDto } from './dto/create-trade.dto';
  import { ImportTradesDto } from './dto/import-trades.dto';
  
  @UseGuards(JwtAuthGuard)
  @Controller('trades')
  export class TradesController {
    constructor(private readonly tradesService: TradesService) {}
  
    @Post()
    create(@Req() req: any, @Body() dto: CreateTradeDto) {
      const userId = req.user.userId;
      return this.tradesService.create(userId, dto);
    }
  
    // used by Trades page (with optional ?accountId=...)
    @Get()
    findForAccount(@Req() req: any, @Query('accountId') accountId?: string) {
      const userId = req.user.userId;
      return this.tradesService.findForAccount(userId, accountId);
    }
  
    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
      const userId = req.user.userId;
      return this.tradesService.findOne(userId, id);
    }
  
    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
      const userId = req.user.userId;
      return this.tradesService.remove(userId, id);
    }
  
    // CSV import endpoint
    @Post('import')
    importTrades(@Req() req: any, @Body() dto: ImportTradesDto) {
      const userId = req.user.userId;
      return this.tradesService.importTrades(userId, dto);
    }
  }
  