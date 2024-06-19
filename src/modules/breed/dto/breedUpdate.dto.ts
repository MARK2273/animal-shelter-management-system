import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateBreedDto {
  @ApiProperty({
    description: 'Name of the animal type',
    example: 'Dog',
    required: false, // Not required for update
  })
  @IsString()
  @IsOptional()
  name?: string;
}
