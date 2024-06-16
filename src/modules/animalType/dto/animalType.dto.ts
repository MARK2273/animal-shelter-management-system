import { IsNotEmpty } from 'class-validator';

export class AnimalTypeDto {
  @IsNotEmpty({ message: 'Animal type should not be empty ' })
  name: string;
}