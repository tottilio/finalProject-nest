import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateBusDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1)
  total_seat: number;
}