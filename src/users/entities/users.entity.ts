import { ReservationSeat } from "src/reservations/entities/reservations.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    lastname: string

    @Column({
        type: 'varchar',
        length: 50,
    })
    email: string

    @Column({ type: 'varchar', length: 500 })
    password: string

    @OneToMany(() => ReservationSeat, reservation => reservation.user)
    reservations: ReservationSeat[];

}