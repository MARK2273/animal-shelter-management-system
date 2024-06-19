import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({ message: 'Donation Information should not be empty ' })
  @IsOptional()
  donation_info?: string;

  @IsNotEmpty({ message: 'Date should not be empty ' })
  date: Date;

  @IsNotEmpty({ message: 'Animal should not be empty' })
  @IsOptional()
  animal?: { id: number };

  @IsNotEmpty({ message: 'Customer should not be empty' })
  @IsOptional()
  customer: { id: number };

  @IsNotEmpty({ message: 'Shelter should not be empty' })
  @IsOptional()
  shelter: { id: number };
}
