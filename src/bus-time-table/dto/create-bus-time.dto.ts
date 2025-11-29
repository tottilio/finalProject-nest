import { IsInt, IsDateString } from 'class-validator';

export class CreateBusTimetableDto {
  @IsInt()
  fk_route: number;

  @IsDateString()
  date: string;

  @IsInt()
  fk_bus: number;

  @IsDateString()
  departure_time: string;

  @IsDateString()
  arrival_time: string;
}
