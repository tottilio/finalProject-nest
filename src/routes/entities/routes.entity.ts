import { BusTimeTable } from "src/bus-time-table/entities/bus-time-table.entity";
import { Bus } from "src/bus/entities/bus.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    deperture: string; // Así está mal escrito en tu DB, lo dejamos igual

    @Column({ type: 'varchar' })
    arrival: string;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => BusTimeTable, timetable => timetable.fk_route)
    timetables: BusTimeTable[];

    
}