import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}