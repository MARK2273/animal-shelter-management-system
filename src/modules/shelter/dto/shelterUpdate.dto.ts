import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateShelterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
