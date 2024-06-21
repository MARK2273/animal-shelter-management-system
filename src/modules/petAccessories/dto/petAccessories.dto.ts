import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PetAccessoriesDto {
  @ApiProperty({
    description: 'Name of the Items',
    example: 'Food Packet',
  })
  @IsNotEmpty({ message: 'Item Name should not be empty' })
  name: string;

  @ApiProperty({
    description: 'Quantity of item',
    example: 20,
  })
  @IsNotEmpty({ message: 'Quantity should not be empty' })
  quantity: number;

  @ApiProperty({
    description: 'Price of the Item',
    example: 2000,
  })
  @IsNotEmpty({ message: 'Price should not be empty' })
  price: number;

  @ApiProperty({
    description: 'ID of the Shelter',
    example: 1,
  })
  @IsNotEmpty({ message: 'Shelter Id should not be empty' })
  shelterId: number;
}
