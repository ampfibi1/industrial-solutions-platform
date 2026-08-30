import {
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  phone!: string;

  @MinLength(6)
  password!: string;
}