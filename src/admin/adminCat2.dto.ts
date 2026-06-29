import { IsEmail,IsIn,IsNotEmpty,IsString,Matches,MinLength} from 'class-validator';

export class AdminCat2Dto {
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@aiub\.edu$/, {message: 'Email must contain aiub.edu domain'})
  email!: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long'})
  @Matches(/(?=.*[A-Z])/, {message: 'Password must contain at least one uppercase character',})
  password!: string;

  @IsString()
  @IsIn(['male', 'female'], {message: 'Gender must be either male or female',})
  gender!: string;

  @Matches(/^[0-9]+$/, {message: 'Phone number must contain only numbers',})
  phoneNumber!: string;
}