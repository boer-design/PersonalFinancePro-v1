import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TradesModule } from './trades/trades.module';
import { HoldingsModule } from './holdings/holdings.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TradesModule, HoldingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
