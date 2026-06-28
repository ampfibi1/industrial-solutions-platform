import { Injectable } from '@nestjs/common';


import {
  IsString,
  IsNotEmpty,
  Matches,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CustomerDto {

  // Name should not contain numbers
  @IsString()
  @Matches(/^[^0-9]*$/, {
    message: 'Name should not contain numbers',
  })
  name?: string;

  // Password is required
  @IsNotEmpty({
    message: 'Password is required',
  })

  // Password must contain @,#,$,&
  @Matches(/[@#$&]/, {
    message: 'Password must contain one special character (@,#,$,&)',
  })
  password?: string;

  // Date validation
  @IsDateString({}, {
    message: 'Invalid date',
  })
  dob?: string;

  // URL validation
  @IsUrl({}, {
    message: 'Invalid social media URL',
  })
  socialMedia?: string;
}