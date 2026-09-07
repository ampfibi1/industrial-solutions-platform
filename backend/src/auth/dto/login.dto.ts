import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}