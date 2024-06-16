import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'First name should not be empty ' })
  fname: string;

  @IsNotEmpty({ message: 'Last name should not be empty' })
  lname: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Contact should not be empty' })
  @MinLength(10)
  @MaxLength(10)
  contact: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;
}
