import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
