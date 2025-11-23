import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;   // INT auto increment

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    lastname: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;  // Hash bcrypt
}