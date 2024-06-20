import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimalDescriptionDto {
  @ApiProperty({
    description: 'Food preference of the animal',
    example: 'Dry food',
  })
  @IsNotEmpty({ message: 'Food preference should not be empty' })
  @IsString()
  food_preference: string;

  @ApiProperty({
    description: 'Special day for the animal',
    example: '2024-06-30',
  })
  @IsNotEmpty({ message: 'Special day should not be empty' })
  special_day: Date;
}
