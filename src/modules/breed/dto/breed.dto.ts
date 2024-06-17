import { IsNotEmpty } from 'class-validator';
import { Medication } from 'src/modules/medication/medication.entity';
// import { Medication } from '../../medication/medication.entity';

export class BreedDto {
  @IsNotEmpty({ message: 'Animal type should not be empty ' })
  name: string;
}

export class BreedWithMedicationDto {
  @IsNotEmpty({ message: 'Animal type should not be empty ' })
  name: string;

  @IsNotEmpty({ message: 'Medication Information should not be empty ' })
  medication: Medication;
}
