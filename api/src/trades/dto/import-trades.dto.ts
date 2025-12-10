import {
  IsUUID,
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AssetType } from '@prisma/client';

export class ImportTradeRowDto {
  @IsDateString()
  date!: string; // ISO string

  @IsString()
  symbol!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(AssetType)
  assetType?: AssetType;

  @IsOptional()
  @IsString()
  currency?: string;

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