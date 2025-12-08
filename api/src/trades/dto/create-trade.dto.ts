import {
    IsUUID,
    IsDateString,
    IsEnum,
    IsNumber,
    IsPositive,
  } from 'class-validator';
  
  export class CreateTradeDto {
    @IsUUID()
    accountId!: string;
  
    @IsUUID()
    assetId!: string;
  
    @IsDateString()
    date!: string; // ISO string
  
    @IsEnum(['BUY', 'SELL'])
    side!: 'BUY' | 'SELL';
  
    @IsNumber()
    @IsPositive()
    quantity!: number;
  
    @IsNumber()
    @IsPositive()
    price!: number;
  
    @IsNumber()
    fee!: number;
  }
  