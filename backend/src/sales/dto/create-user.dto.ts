import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

  @IsOptional()
  @IsString({ message: 'Full name must be a string.' })
  fullName?: string | null;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsNumber({}, { message: 'Phone must be a number.' })
  phone: number;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean.' })
  isActive?: boolean;
}