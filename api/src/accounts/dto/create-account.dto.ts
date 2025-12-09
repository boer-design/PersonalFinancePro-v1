import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  // Make "type" required because the Prisma model requires it
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  type!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  currency!: string;
}
