import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TradesModule } from './trades/trades.module';
import { HoldingsModule } from './holdings/holdings.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TradesModule,
    HoldingsModule,
    AccountsModule,
  ],
})
export class AppModule {}
