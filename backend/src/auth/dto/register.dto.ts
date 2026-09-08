import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../db/enums/role.enum';

export class RegisterDto {

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be ADMIN, SALES_EXECUTIVE, ENGINEER or CUSTOMER.' })
  role?: Role;
}