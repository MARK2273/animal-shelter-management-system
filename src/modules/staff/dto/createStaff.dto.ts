import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Position } from '../staff.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    required: true,
  })
  name: string;

  @IsEnum(Position)
  @ApiProperty({
    required: true,
  })
  position: Position;

  @IsEmail()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  contact: string;
}
