import { IsNotEmpty, IsOptional } from 'class-validator';
import { Gender } from '../animal.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnimalDto {
  @ApiProperty({
    description: 'Weight of the animal in kg',
    example: 30,
  })
  @IsNotEmpty({ message: 'Weight should not be empty ' })
  @IsOptional()
  weight?: number;

  @ApiProperty({
    description: 'Age of the animal in years',
    example: 5,
  })
  @IsNotEmpty({ message: 'Age should not be empty' })
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Adoption rate for the animal',
    example: 100,
  })
  @IsNotEmpty({ message: 'Rate should not be empty' })
  @IsOptional()
  rate?: number;

  @ApiProperty({
    description: 'Colour of the animal',
    example: 'Brown',
  })
  @IsNotEmpty({ message: 'Colour should not be empty' })
  @IsOptional()
  colour?: string;

  @ApiProperty({
    description: 'Gender of the animal',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsNotEmpty({ message: 'Gender should not be empty' })
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    description: 'Cage size for the animal',
    example: 'Large',
  })
  @IsNotEmpty({ message: 'Cage size should not be empty' })
  @IsOptional()
  cage_size?: string;
}
