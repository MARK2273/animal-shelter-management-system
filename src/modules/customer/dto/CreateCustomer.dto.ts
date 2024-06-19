import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'First name should not be empty ' })
  fname: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Last name should not be empty' })
  lname: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Contact should not be empty' })
  @MinLength(10)
  @MaxLength(10)
  contact: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;
}
