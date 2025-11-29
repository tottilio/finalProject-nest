import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  create(createBusDto: CreateBusDto) {
    const bus = this.busRepository.create(createBusDto);
    return this.busRepository.save(bus);
  }

  findAll() {
    return this.busRepository.find();
  }

  async findOne(id: number) {
    const bus = await this.busRepository.findOne({ where: { id } });
    if (!bus) throw new NotFoundException('Bus not found');
    return bus;
  }

  async update(id: number, updateBusDto: UpdateBusDto) {
    const bus = await this.findOne(id);
    const updated = Object.assign(bus, updateBusDto);
    return this.busRepository.save(updated);
  }

  async remove(id: number) {
    const bus = await this.findOne(id);
    return this.busRepository.remove(bus);
  }
}
