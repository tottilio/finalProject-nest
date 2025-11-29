import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reservations_seat')
export class ReservationSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fk_horarios: number; // fk_bus_timetable

  @Column()
  fk_users: number;

  @Column()
  reserve_num: number; // número de asiento reservado
}