import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Position } from '../staff.entity';

export class CreateStaffDto {
  @IsNotEmpty({ message: 'Name should not be empty ' })
  name: string;

  @IsNotEmpty({ message: 'Position should not be empty ' })
  position: Position;

  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @IsNotEmpty({ message: 'Contact should not be empty' })
  @MinLength(10)
  @MaxLength(10)
  contact: string;

  @IsNotEmpty({ message: 'Shelter should not be empty' })
  sheltersId: number;
}

export class CreateStaffWithShelterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Position)
  position: Position;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}
