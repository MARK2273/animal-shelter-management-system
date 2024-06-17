import { IsString, IsOptional } from 'class-validator';

export class UpdateBreedDto {
  @IsString()
  @IsOptional()
  name?: string;
}
