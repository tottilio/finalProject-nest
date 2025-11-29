import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusTimetableService } from './bus-time-table.service';
import { CreateBusTimetableDto } from './dto/create-bus-time.dto';
import { UpdateBusTimetableDto } from './dto/update-bus-time.dto';

@Controller('bus-timetable')
export class BusTimetableController {
  constructor(private readonly timetableService: BusTimetableService) {}

  @Post()
  create(@Body() dto: CreateBusTimetableDto) {
    return this.timetableService.create(dto);
  }

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timetableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeTableDto: UpdateBusTimetableDto) {
    return this.timetableService.update(+id, updateTimeTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timetableService.remove(+id);
  }
}
