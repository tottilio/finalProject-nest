import { IsInt, Min } from 'class-validator';

export class CreateReservationSeatDto {
  @IsInt()
  fk_horarios: number;

  @IsInt()
  fk_users: number;

  @IsInt()
  @Min(1)
  reserve_num: number;
}
