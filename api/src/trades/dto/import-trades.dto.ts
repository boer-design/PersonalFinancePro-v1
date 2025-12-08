import {
    IsUUID,
    IsDateString,
    IsEnum,
    IsNumber,
    IsPositive,
    IsString,
    ValidateNested,
    ArrayMinSize,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class ImportTradeRowDto {
    @IsDateString()
    date!: string; // ISO string
  
    @IsString()
    symbol!: string;
  
    @IsString()
    name!: string;
  
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
  
  export class ImportTradesDto {
    @IsUUID()
    accountId!: string;
  
    @ValidateNested({ each: true })
    @Type(() => ImportTradeRowDto)
    @ArrayMinSize(1)
    trades!: ImportTradeRowDto[];
  }
  