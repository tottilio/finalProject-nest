import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}