import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;      // note the !

  @IsString()
  password!: string;   // note the !
}
