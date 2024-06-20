import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindUser {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'test',
    required: true,
  })
  password: string;
}
