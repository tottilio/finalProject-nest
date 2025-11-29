import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationSeat } from './entities/reservations.entity';
import { ReservationsSeatService } from './reservations.service';
import { ReservationsSeatController } from './reservations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationSeat])],
  controllers: [ReservationsSeatController],
  providers: [ReservationsSeatService],
})
export class ReservationsSeatModule {}
