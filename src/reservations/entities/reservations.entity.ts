import { BusTimeTable } from 'src/bus-time-table/entities/bus-time-table.entity';
import { User } from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reservations_seat')
export class ReservationSeat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reserve_num: number; // número de asiento reservado

    // RELACIÓN CON USUARIO
    @ManyToOne(() => User, user => user.reservations)
    @JoinColumn({ name: 'fk_users' })  // <- ESTE será tu FK real
    user: User;

    // RELACIÓN CON HORARIO
    @ManyToOne(() => BusTimeTable, timetable => timetable.reservations)
    @JoinColumn({ name: 'fk_horarios' }) // <- ESTE será tu FK real
    timetable: BusTimeTable;
}
