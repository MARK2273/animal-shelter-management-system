import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export enum Payment {
  CASH = 'cash',
  CARD = 'card',
}

export class CreateAdoptionDto {
  @ApiPropertyOptional({
    description: 'Information about the adoption',
    example: 'Adopted a Labrador puppy',
  })
  @IsNotEmpty({ message: 'Adoption Information should not be empty ' })
  @IsOptional()
  adoption_info?: string;

  @ApiProperty({
    description: 'Mode of payment',
    example: 'Credit Card',
    enum: Payment,
  })
  @IsNotEmpty({ message: 'Payment Mode should not be empty ' })
  payment_mode: Payment;

  @ApiProperty({
    description: 'Date of adoption',
    example: '2024-06-19T18:25:43.511Z',
    type: Date,
  })
  @IsNotEmpty({ message: 'Date should not be empty ' })
  date: Date;

  @ApiPropertyOptional({
    description: 'ID of the animal being adopted',
    example: { id: 1 },
  })
  @IsNotEmpty({ message: 'Animal should not be empty' })
  @IsOptional()
  animal?: { id: number };

  @ApiProperty({
    description: 'ID of the customer adopting the animal',
    example: { id: 1 },
  })
  @IsNotEmpty({ message: 'Customer should not be empty' })
  customer: { id: number };

  @ApiProperty({
    description: 'ID of the shelter where the adoption is taking place',
    example: { id: 1 },
  })
  @IsNotEmpty({ message: 'Shelter should not be empty' })
  shelter: { id: number };
}
