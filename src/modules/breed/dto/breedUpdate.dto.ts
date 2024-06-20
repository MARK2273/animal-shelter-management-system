import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateBreedDto {
  @ApiProperty({
    description: 'Name of the Animal Breed',
    example: 'Dog',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
