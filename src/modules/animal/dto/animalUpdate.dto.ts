import { IsNotEmpty, IsOptional } from 'class-validator';
import { Gender } from '../animal.entity';

export class UpdateAnimalDto {
  @IsNotEmpty({ message: 'Weight should not be empty ' })
  @IsOptional()
  weight?: number;

  @IsNotEmpty({ message: 'Age should not be empty' })
  @IsOptional()
  age?: number;

  @IsNotEmpty({ message: 'Rate should not be empty' })
  @IsOptional()
  rate?: number;

  @IsNotEmpty({ message: 'Colour should not be empty' })
  @IsOptional()
  colour?: string;

  @IsNotEmpty({ message: 'Gender should not be empty' })
  @IsOptional()
  gender?: Gender;

  @IsNotEmpty({ message: 'Cage size should not be empty' })
  @IsOptional()
  cage_size?: string;
}
