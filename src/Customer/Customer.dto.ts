import { Injectable } from '@nestjs/common';
import { IsString,IsNotEmpty } from 'class-validator';


export class CustomerDto {

/*
  @IsString()
  @Matches(/^[^0-9]*$/, {
    message: 'Name should not contain number',
  })
  name?: string;

  @IsNotEmpty({
    message: 'Password is required',
  })

  @Matches(/[@#$&]/, {
    message: 'Password must contain one special charactwe',
  })
  password?: string;

  @IsDateString({}, {
    message: 'Invalid date',
  })
  dob?: string;


  @IsUrl({}, {
    message: 'Invalid social media URL',
  })
  socialMedia?: string;
  */
@IsString(
  {
    message: 'Fullname must be a string',
  }
)
fullname?: string;

@IsNotEmpty({
    message: 'Age is required',
  })
age?: number;



}