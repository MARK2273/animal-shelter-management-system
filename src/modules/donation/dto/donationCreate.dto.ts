import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({ message: 'Donation Information should not be empty ' })
  donation_info: string;

  @IsNotEmpty({ message: 'Date should not be empty ' })
  date: Date;

  @IsNotEmpty({ message: 'Animal should not be empty' })
  @IsOptional()
  animalId?: number;

  @IsNotEmpty({ message: 'Customer should not be empty' })
  @IsOptional()
  customerId?: number;

  @IsNotEmpty({ message: 'Shelter should not be empty' })
  @IsOptional()
  ShelterId?: number;
}
