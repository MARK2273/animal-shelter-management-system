import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateMedicationDto {
  @IsString()
  @IsOptional()
  allergie?: string;

  @IsString()
  @IsOptional()
  veterinarian?: string;

  @IsDate()
  @IsOptional()
  vaccination_date?: Date;
}
