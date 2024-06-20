import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({
    description: 'Donation information',
    required: false,
    example: 'Monetary donation for animal care',
  })
  @IsNotEmpty({ message: 'Donation Information should not be empty' })
  @IsOptional()
  donation_info?: string;

  @ApiProperty({
    description: 'Date of donation',
    example: '2024-06-19',
  })
  @IsNotEmpty({ message: 'Date should not be empty' })
  date: Date;

  @ApiProperty({
    description: 'ID of the animal receiving the donation',
    example: { id: 1 },
  })
  @IsNotEmpty({ message: 'Animal should not be empty' })
  @IsOptional()
  animal?: { id: number };

  @ApiProperty({
    description: 'ID of the customer making the donation',
    example: { id: 1 },
  })
  @IsNotEmpty({ message: 'Customer should not be empty' })
  customer: { id: number };

  @ApiProperty({
    description: 'ID of the shelter receiving the donation',
    example: { id: 1 },
  })
  @IsNotEmpty({ message: 'Shelter should not be empty' })
  shelter: { id: number };
}
