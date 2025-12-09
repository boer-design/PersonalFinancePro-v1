import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  type?: string;

  @IsOptional()
  @IsString()
  @Length(3, 10)
  currency?: string;
}
