import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationSeat } from './entities/reservations.entity';
import { UpdateReservationSeatDto } from './dto/update-reservation.dto';
import { CreateReservationSeatDto } from './dto/create-reservation.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ReservationsSeatService {
  constructor(
    @InjectRepository(ReservationSeat)
    private reservationsRepo: Repository<ReservationSeat>,
      private dataSource: DataSource,   // <-- añadir esto
  ) {}

  async create(dto: CreateReservationSeatDto) {
  const { fk_horarios, reserve_num, fk_users } = dto;

  return await this.dataSource.transaction(async manager => {
    // 1. Buscar si el asiento ya existe
    const existing = await manager.findOne(ReservationSeat, {
      where: { 
        timetable: { id: fk_horarios },
        reserve_num 
      },
      lock: { mode: 'pessimistic_write' }
    });

    if (existing) {
      throw new Error('El asiento ya fue reservado por otro usuario');
    }

    // 2. Crear reserva asociando RELACIONES, no FKs sueltas.
    const reservation = manager.create(ReservationSeat, {
      reserve_num,
      user: { id: fk_users },
      timetable: { id: fk_horarios }
    });

    // 3. Guardar
    return await manager.save(reservation);
  });
}

  findAll() {
    return this.reservationsRepo.find({
      relations: ['horario', 'user'],
    });
  }

  async findOne(id: number) {
    const data = await this.reservationsRepo.findOne({
      where: { id },
      relations: ['horario', 'user'],
    });

    if (!data) throw new NotFoundException('Reservation not found');

    return data;
  }

  async update(id: number, dto: UpdateReservationSeatDto) {
    await this.findOne(id); // valida que exista
    await this.reservationsRepo.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.reservationsRepo.delete(id);
  }
}

