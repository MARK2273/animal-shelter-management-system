import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateShelterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({})
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({})
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({})
  address?: string;
}
