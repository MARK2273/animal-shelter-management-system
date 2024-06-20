import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
// import { Medication } from '../../medication/medication.entity';

export class BreedDto {
  @ApiProperty({
    description: 'Name of the Breed',
    example: 'Bulldog',
    required: true,
  })
  @IsNotEmpty({ message: 'Animal Breed should not be empty' })
  name: string;
}

export class BreedWithMedicationDto {
  @ApiProperty({
    description: 'Name of the animal type',
    example: 'Dog',
    required: true,
  })
  @IsNotEmpty({ message: 'Animal type should not be empty' })
  name: string;

  @ApiProperty({
    description: 'Name of the allergy',
    example: 'Pollen',
    required: true,
  })
  @IsNotEmpty({ message: 'Allergie name should not be empty' })
  allergie: string;

  @ApiProperty({
    description: 'Name of the veterinarian',
    example: 'Dr. Smith',
    required: true,
  })
  @IsNotEmpty({ message: 'Veterinarian name should not be empty' })
  veterinarian: string;

  @ApiProperty({
    description: 'Date of vaccination',
    example: '2024-06-19T12:00:00Z',
    required: true,
  })
  @IsNotEmpty({ message: 'Vaccination Date should not be empty' })
  @IsDate()
  vaccination_date: Date;
}
