import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { Role } from 'src/db/enums/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  phone!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(Role, {message: "Role must be ADMIN,CUSTOMERENGINEER or SALES_EXECUTIVE",})
  role!: Role;
}