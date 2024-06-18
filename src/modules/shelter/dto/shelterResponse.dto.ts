import { Exclude, Expose, Type } from 'class-transformer';
import { StaffResponseDto } from 'src/modules/staff/dto/staffResponse.dto';

@Exclude()
export class ShelterResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  @Type(() => StaffResponseDto)
  staff: StaffResponseDto[];
}

// dto/staff-response.dto.ts
