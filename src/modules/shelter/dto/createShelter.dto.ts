import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateStaffWithShelterDto } from 'src/modules/staff/dto/createStaff.dto';

export class CreateShelterDto {
  @IsNotEmpty({ message: 'Shelter name should not be empty ' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;
}

export class CreateShelterWithStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStaffWithShelterDto)
  staff: CreateStaffWithShelterDto[];
}
