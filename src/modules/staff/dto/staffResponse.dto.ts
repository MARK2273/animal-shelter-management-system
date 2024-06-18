import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StaffResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  position: string;

  @Expose()
  email: string;

  @Expose()
  contact: string;
}
