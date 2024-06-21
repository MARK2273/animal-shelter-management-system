import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePetAccessoriesDto {
  @ApiProperty({
    description: 'Name of the Pet Accessories',
    example: 'Pollen',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Quantity of item',
    example: 50,
    required: false,
  })
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'Price of the Item',
    example: 5000,
    required: false,
  })
  @IsOptional()
  price?: number;
}
