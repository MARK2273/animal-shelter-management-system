import { IsNotEmpty, IsOptional } from 'class-validator';

export enum Payment {
  CASH = 'cash',
  CARD = 'card',
}

export class CreateAdoptionDto {
  @IsNotEmpty({ message: 'Adoption Information should not be empty ' })
  @IsOptional()
  adoption_info?: string;

  @IsNotEmpty({ message: 'Payment Mode should not be empty ' })
  payment_mode: Payment;

  @IsNotEmpty({ message: 'Date should not be empty ' })
  date: Date;

  @IsNotEmpty({ message: 'Animal should not be empty' })
  @IsOptional()
  animal?: { id: number };

  @IsNotEmpty({ message: 'Customer should not be empty' })
  customer: { id: number };

  @IsNotEmpty({ message: 'Shelter should not be empty' })
  shelter: { id: number };
}
