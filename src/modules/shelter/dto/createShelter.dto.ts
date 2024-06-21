import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Shelter name should not be empty ' })
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;
}

export class CreateShelterWithStaffDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'shelter1',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'shelter1@gmail.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'shelter1 Address',
  })
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type((): typeof CreateStaffWithShelterDto => CreateStaffWithShelterDto)
  @ApiProperty({
    required: true,
    default: [
      {
        name: 'user1',
        position: 'owner',
        email: 'ussdcer1@gmail.com',
        password: 'securePassword123',
        contact: '5555555555',
      },
      {
        name: 'usswdcver1',
        position: 'worker',
        email: 'ussdcwadcer1@gmail.com',
        password: 'securePassword123',
        contact: '5555555555',
      },
    ],
  })
  staff: CreateStaffWithShelterDto[];
}
