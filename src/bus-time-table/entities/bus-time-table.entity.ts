import { Bus } from 'src/bus/entities/bus.entity';
import { ReservationSeat } from 'src/reservations/entities/reservations.entity';
import { Route } from 'src/routes/entities/routes.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('bus_timetable')
export class BusTimeTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fk_route', type: 'int' })
  fk_route: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ name: 'fk_bus', type: 'int' })
  fk_bus: number;

  @Column({ name: 'departure_time', type: 'timestamp' })
  departure_time: Date;

  @Column({ name: 'arrival_time', type: 'timestamp' })
  arrival_time: Date;

  @ManyToOne(() => Route, route => route.timetables)
  @JoinColumn({ name: 'fk_route' })
  route: Route;

  @ManyToOne(() => Bus, bus => bus.timetables)
  @JoinColumn({ name: 'fk_bus' })
  bus: Bus;

  @OneToMany(() => ReservationSeat, reservation => reservation.timetable)
  reservations: ReservationSeat[];
}
