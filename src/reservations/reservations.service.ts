import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationSeat } from './entities/reservations.entity';
import { UpdateReservationSeatDto } from './dto/update-reservation.dto';
import { CreateReservationSeatDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsSeatService {
  constructor(
    @InjectRepository(ReservationSeat)
    private reservationsRepo: Repository<ReservationSeat>,
  ) {}

  create(dto: CreateReservationSeatDto) {
    const newReservation = this.reservationsRepo.create(dto);
    return this.reservationsRepo.save(newReservation);
  }

  findAll() {
    return this.reservationsRepo.find();
  }

  async findOne(id: number) {
    const reservation = await this.reservationsRepo.findOne({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  async update(id: number, dto: UpdateReservationSeatDto) {
    const reservation = await this.findOne(id);
    return this.reservationsRepo.save({ ...reservation, ...dto });
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    return this.reservationsRepo.remove(reservation);
  }
}
