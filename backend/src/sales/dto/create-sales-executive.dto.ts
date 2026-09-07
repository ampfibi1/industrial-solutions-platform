import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
} from 'class-validator';

/**
  *  4. nidImage  → Required filename string
 */
export class CreateSalesExecutiveDto {

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Invalid Name.',
  })
  name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address containing @.' })
  @Matches(/^[^\s@]+@[^\s@]+\.xyz$/, {
    message: 'Email must use a .xyz domain (e.g. john@company.xyz).',
  })
  email: string;

  @IsNotEmpty({ message: 'NID number is required.' })
  @IsString({ message: 'NID number must be a string of digits.' })
  @Matches(/^\d{10}$|^\d{17}$/, {
    message: 'NID number must be exactly 10 or 17 digits (Bangladesh NID format).',
  })
  nidNumber: string;

  // RULE 4: NID image filename is required
  @IsNotEmpty({ message: 'NID image is required.' })
  @IsString({ message: 'NID image must be a valid filename.' })
  nidImage: string;
}