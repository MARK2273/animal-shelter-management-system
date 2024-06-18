import { IsNotEmpty } from 'class-validator';

export class CreateAnimalDescriptionDto {
  @IsNotEmpty({ message: 'Food_preference should not be empty ' })
  food_preference: string;

  @IsNotEmpty({ message: 'Special day should not be empty' })
  special_day: Date;
}
