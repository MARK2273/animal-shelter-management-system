import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMedicationDto {
  @ApiProperty({
    description: 'Name of the allergy',
    example: 'Pollen',
    required: false,
  })
  @IsString()
  @IsOptional()
  allergie?: string;

  @ApiProperty({
    description: 'Name of the veterinarian',
    example: 'Dr. Smith',
    required: false,
  })
  @IsString()
  @IsOptional()
  veterinarian?: string;

  @ApiProperty({
    description: 'Date of vaccination',
    example: '2024-06-19',
    required: false,
  })
  @IsOptional()
  vaccination_date?: Date;
}
