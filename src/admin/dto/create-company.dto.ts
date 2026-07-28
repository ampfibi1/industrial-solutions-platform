import { IsNotEmpty, IsString, Length, IsOptional, IsEmail, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  @Matches(/^[A-Z0-9]+$/, { message: 'GST number must be alphanumeric and uppercase' })
  gstNumber!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  industry?: string;

}