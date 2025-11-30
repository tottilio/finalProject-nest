import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateReservationSeatDto } from './dto/create-reservation.dto';
import { UpdateReservationSeatDto } from './dto/update-reservation.dto';
import { ReservationsSeatService } from './reservations.service';

@Controller('reservations')
export class ReservationsSeatController {
  constructor(private readonly reservationsService: ReservationsSeatService) {}

  @Post()
  create(@Body() dto: CreateReservationSeatDto) {
    return this.reservationsService.create(dto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReservationSeatDto) {
    return this.reservationsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}