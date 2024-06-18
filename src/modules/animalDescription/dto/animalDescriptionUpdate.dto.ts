import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAnimalDescriptionDto {
  @IsNotEmpty({ message: 'Food_preference should not be empty ' })
  @IsOptional()
  food_preference?: string;

  @IsNotEmpty({ message: 'Special day should not be empty' })
  @IsOptional()
  special_day?: Date;
}
