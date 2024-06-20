import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAnimalDescriptionDto {
  @ApiProperty({
    description: 'Food preference of the animal',
    example: 'Dry food',
  })
  @IsNotEmpty({ message: 'Food preference should not be empty' })
  @IsOptional()
  @IsString()
  food_preference?: string;

  @ApiProperty({
    description: 'Special day for the animal',
    example: '2024-06-30',
  })
  @IsNotEmpty({ message: 'Special day should not be empty' })
  @IsOptional()
  @IsDate()
  special_day?: Date;
}
