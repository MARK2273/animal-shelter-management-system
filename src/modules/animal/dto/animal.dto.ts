import { IsNotEmpty } from 'class-validator';
import { Gender } from '../animal.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({
    description: 'Weight of the animal in kg',
    example: 30,
  })
  @IsNotEmpty({ message: 'Weight should not be empty ' })
  weight: number;

  @ApiProperty({
    description: 'Age of the animal in years',
    example: 5,
  })
  @IsNotEmpty({ message: 'Age should not be empty' })
  age: number;

  @ApiProperty({
    description: 'Adoption rate for the animal',
    example: 100,
  })
  @IsNotEmpty({ message: 'Rate should not be empty' })
  rate: number;

  @ApiProperty({
    description: 'Colour of the animal',
    example: 'Brown',
  })
  @IsNotEmpty({ message: 'Colour should not be empty' })
  colour: string;

  @ApiProperty({
    description: 'Gender of the animal',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsNotEmpty({ message: 'Gender should not be empty' })
  gender: Gender;

  @ApiProperty({
    description: 'Cage size for the animal',
    example: 'Large',
  })
  @IsNotEmpty({ message: 'Cage size should not be empty' })
  cage_size: string;

  @ApiProperty({
    description: 'ID of the animal type',
    example: 1,
  })
  @IsNotEmpty({ message: 'Animal Type should not be empty' })
  animalTypeId: number;

  @ApiProperty({
    description: 'ID of the breed',
    example: 2,
  })
  @IsNotEmpty({ message: 'Breed should not be empty' })
  breedId: number;

  @ApiProperty({
    description: 'ID of the animal description',
    example: 2,
  })
  @IsNotEmpty({ message: 'Animal Description should not be empty' })
  animalDescriptionId: number;

  @ApiProperty({
    description: 'ID of the shelter',
    example: 1,
  })
  @IsNotEmpty({ message: 'Shelter should not be empty' })
  shelterId: number;
}
