import {  IsEmail,  IsEnum,  IsInt,  IsNotEmpty,  IsOptional,  IsString,  MaxLength,  MinLength,} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;//! define =>  promise this property will be assigned later

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone!: string;

  @IsEnum(Role)
  role!: Role;

  @IsOptional()
  @IsInt()
  companyId?: number;
}
