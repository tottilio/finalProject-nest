import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusTimeTable } from './entities/bus-time-table.entity';
import { BusTimetableService } from './bus-time-table.service';
import { BusTimetableController } from './bus-time-table.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BusTimeTable])],
  controllers: [BusTimetableController],
  providers: [BusTimetableService],
})
export class BusTimetableModule {}
