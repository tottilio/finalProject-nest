import { Module } from '@nestjs/common';
import { BusTimeTableController } from './bus-time-table.controller';
import { BusTimeTableService } from './bus-time-table.service';

@Module({
  controllers: [BusTimeTableController],
  providers: [BusTimeTableService]
})
export class BusTimeTableModule {}
