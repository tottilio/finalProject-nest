import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusTimeTable } from './entities/bus-time-table.entity';
import { CreateBusTimetableDto } from './dto/create-bus-time.dto';
import { UpdateBusTimetableDto } from './dto/update-bus-time.dto';

@Injectable()
export class BusTimetableService {
  constructor(
    @InjectRepository(BusTimeTable)
    private timetableRepo: Repository<BusTimeTable>,
  ) {}

  async create(createBusTibleDto: CreateBusTimetableDto) {
    const horario = this.timetableRepo.create(createBusTibleDto);
    return await this.timetableRepo.save(horario);
  }

  async findAll() {
    return await this.timetableRepo.find();
  }

  async findOne(id: number) {
    const horario = await this.timetableRepo.findOne({ where: { id } });
    if (!horario) throw new NotFoundException('Horario no encontrado');
    return horario;
  }

  async update(id: number, updateBusTimeTibleDto: UpdateBusTimetableDto) {
    const horario = await this.findOne(id);
    const updated = Object.assign(horario, updateBusTimeTibleDto);
    return await this.timetableRepo.save(updated);
  }

  async remove(id: number) {
    const horario = await this.findOne(id);
    return await this.timetableRepo.remove(horario);
  }
}
