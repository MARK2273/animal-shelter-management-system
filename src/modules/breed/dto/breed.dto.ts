import { IsNotEmpty } from 'class-validator';
// import { Medication } from '../../medication/medication.entity';

export class BreedDto {
  @IsNotEmpty({ message: 'Animal type should not be empty ' })
  name: string;
}

export class BreedWithMedicationDto {
  @IsNotEmpty({ message: 'Animal type should not be empty ' })
  name: string;

  @IsNotEmpty({ message: 'Allergie name should not be empty ' })
  allergie: string;

  @IsNotEmpty({ message: 'Veterinarian name should not be empty' })
  veterinarian: string;

  @IsNotEmpty({ message: 'Vaccination Date should not be empty' })
  vaccination_date: Date;
}
