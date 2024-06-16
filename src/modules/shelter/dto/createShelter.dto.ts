import { IsNotEmpty } from 'class-validator';

export class CreateShelterDto {
  @IsNotEmpty({ message: 'Shelter name should not be empty ' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;
}
