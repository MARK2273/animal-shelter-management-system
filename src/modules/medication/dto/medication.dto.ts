import { IsNotEmpty } from 'class-validator';

export class MedicationDto {
  @IsNotEmpty({ message: 'Allergie name should not be empty ' })
  allergies: string;

  @IsNotEmpty({ message: 'Veterinarian name should not be empty ' })
  veterinarian: string;

  @IsNotEmpty({ message: 'Vaccination date should not be empty ' })
  vaccination_date: Date;

  @IsNotEmpty({ message: 'Breed Id should not be empty ' })
  breeId: number;
}
