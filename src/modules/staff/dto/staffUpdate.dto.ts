import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Position } from '../staff.entity';

export class UpdateStaffDto {
  @IsNotEmpty({ message: 'Name should not be empty ' })
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'Position should not be empty ' })
  @IsOptional()
  position: Position;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsOptional()
  email: string;

  @IsNotEmpty({ message: 'Contact should not be empty' })
  @IsOptional()
  @MinLength(10)
  @MaxLength(10)
  contact: string;
}
