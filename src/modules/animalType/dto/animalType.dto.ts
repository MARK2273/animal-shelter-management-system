import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AnimalTypeDto {
  @ApiProperty({
    description: 'Name of the animal type',
    example: 'Dog',
  })
  @IsNotEmpty({ message: 'Animal type should not be empty' })
  name: string;
}
