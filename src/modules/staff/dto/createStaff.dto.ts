import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Position } from '../staff.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty({
    description: 'Name of the staff member',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Position of the staff member',
    enum: Position,
  })
  @IsNotEmpty({ message: 'Position should not be empty' })
  position: Position;

  @ApiProperty({
    description: 'Email of the staff member',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the staff member',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Contact number of the staff member',
    example: '9876543210',
  })
  @IsNotEmpty({ message: 'Contact should not be empty' })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  contact: string;

  @ApiProperty({
    description: 'ID of the shelter where the staff member works',
    example: 1,
  })
  @IsNotEmpty({ message: 'Shelter should not be empty' })
  sheltersId: number;
}

export class CreateStaffWithShelterDto {
  @ApiProperty({
    description: 'Name of the staff member',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Position of the staff member',
    enum: Position,
  })
  @IsEnum(Position)
  position: Position;

  @ApiProperty({
    description: 'Email of the staff member',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the staff member',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Contact number of the staff member',
    example: '9876543210',
  })
  @IsNotEmpty({ message: 'Contact should not be empty' })
  @IsString()
  contact: string;

  @ApiProperty({
    description: 'ID of the shelter where the staff member works',
    example: 1,
  })
  @IsNotEmpty({ message: 'Shelter should not be empty' })
  @IsInt()
  shelterId: number;
}
