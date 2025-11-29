import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationSeatDto } from './create-reservation.dto';
export class UpdateReservationSeatDto extends PartialType(CreateReservationSeatDto) {}
