import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { AccountsService } from './accounts.service';
  import { CreateAccountDto } from './dto/create-account.dto';
  import { UpdateAccountDto } from './dto/update-account.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('accounts')
  @UseGuards(JwtAuthGuard)
  export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}
  
    @Post()
    create(@Req() req: any, @Body() dto: CreateAccountDto) {
      const userId = req.user.userId;
      return this.accountsService.create(userId, dto);
    }
  
    @Get()
    findAll(@Req() req: any) {
      const userId = req.user.userId;
      return this.accountsService.findAllForUser(userId);
    }
  
    @Get(':id')
    findOne(@Req() req: any, @Param('id') id: string) {
      const userId = req.user.userId;
      return this.accountsService.findOneForUser(userId, id);
    }
  
    @Patch(':id')
    update(
      @Req() req: any,
      @Param('id') id: string,
      @Body() dto: UpdateAccountDto,
    ) {
      const userId = req.user.userId;
      return this.accountsService.update(userId, id, dto);
    }
  
    @Delete(':id')
    remove(@Req() req: any, @Param('id') id: string) {
      const userId = req.user.userId;
      return this.accountsService.remove(userId, id);
    }
  }
  