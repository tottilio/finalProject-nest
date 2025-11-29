import { IsString, MaxLength } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @MaxLength(100)
  deperture: string;

  @IsString()
  @MaxLength(100)
  arrival: string;

  @IsString()
  @MaxLength(100)
  name: string;
}