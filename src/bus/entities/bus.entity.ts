import { BusTimeTable } from 'src/bus-time-table/entities/bus-time-table.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('bus')
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  total_seat: number;

  @OneToMany(() => BusTimeTable, timetable => timetable.fk_bus)
  timetables: BusTimeTable[];


}