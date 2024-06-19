import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Position } from '../staff.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaffDto {
  @ApiProperty({
    description: 'Name of the staff member',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Position of the staff member',
    enum: Position,
  })
  @IsNotEmpty({ message: 'Position should not be empty' })
  @IsOptional()
  @IsEnum(Position)
  position: Position;

  @ApiProperty({
    description: 'Email of the staff member',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contact number of the staff member',
    example: '9876543210',
  })
  @IsNotEmpty({ message: 'Contact should not be empty' })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  contact: string;
}
