import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindUser {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'a@gmail.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Ayush@123',
    required: true,
  })
  password: string;
}
