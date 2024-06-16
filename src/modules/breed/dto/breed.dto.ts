import { IsNotEmpty } from 'class-validator';

export class BreedDto {
  @IsNotEmpty({ message: 'Animal type should not be empty ' })
  name: string;
}
