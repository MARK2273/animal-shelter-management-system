import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MedicationDto {
  @ApiProperty({
    description: 'Name of the allergy',
    example: 'Pollen',
  })
  @IsNotEmpty({ message: 'Allergie name should not be empty' })
  allergie: string;

  @ApiProperty({
    description: 'Name of the veterinarian',
    example: 'Dr. Smith',
  })
  @IsNotEmpty({ message: 'Veterinarian name should not be empty' })
  veterinarian: string;

  @ApiProperty({
    description: 'Date of vaccination',
    example: '2024-06-19',
  })
  @IsNotEmpty({ message: 'Vaccination Date should not be empty' })
  vaccination_date: Date;

  @ApiProperty({
    description: 'ID of the breed',
    example: 1,
  })
  @IsNotEmpty({ message: 'Breed Id should not be empty' })
  breedId: number;
}
