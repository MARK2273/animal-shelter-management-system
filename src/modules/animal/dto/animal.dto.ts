import { IsNotEmpty } from 'class-validator';
import { Gender } from '../animal.entity';

export class CreateAnimalDto {
  @IsNotEmpty({ message: 'Weight should not be empty ' })
  weight: number;

  @IsNotEmpty({ message: 'Age should not be empty' })
  age: number;

  @IsNotEmpty({ message: 'Rate should not be empty' })
  rate: number;

  @IsNotEmpty({ message: 'Colour should not be empty' })
  colour: string;

  @IsNotEmpty({ message: 'Gender should not be empty' })
  gender: Gender;

  @IsNotEmpty({ message: 'Cage size should not be empty' })
  cage_size: string;

  @IsNotEmpty({ message: 'Animal Type should not be empty' })
  animalTypeId: number;

  @IsNotEmpty({ message: 'Breed should not be empty' })
  breedId: number;

  @IsNotEmpty({ message: 'Animal Description should not be empty' })
  animalDescriptionId: number;

  @IsNotEmpty({ message: 'Shelter should not be empty' })
  shelterId: number;
}
