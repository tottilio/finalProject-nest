import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/routes.entity';
import { CreateRouteDto } from './dto/create-routes.dto';
import { UpdateRouteDto } from './dto/update-routes.dto';


@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const route = this.routeRepository.create(createRouteDto);
    return this.routeRepository.save(route);
  }

  async findAll(){
    return await this.routeRepository.find();
  }

  async findOne(id: number) {
    const route = await this.routeRepository.findOne({ where: { id } });

    if (!route) throw new NotFoundException('Route not found');

    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    const route = await this.findOne(id);
    Object.assign(route, updateRouteDto);
    return this.routeRepository.save(route);
  }

  async remove(id: number){
    const route = await this.findOne(id);
    await this.routeRepository.remove(route);
    return { message: 'Route deleted successfully' };
  }
}
