import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReservationSeat } from 'src/reservations/entities/reservations.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private dataSource: DataSource // <-- necesario para consultar reservas
    ) { }

    async create(createUserDto: CreateUserDto) {
        const existing = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        });

        if (existing) {
            throw new BadRequestException('Este correo ya está registrado');
        }

        const hashed = await bcrypt.hash(createUserDto.password, 10);

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashed,
        });

        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    async findOneById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id }
        })
        if (!user) throw new NotFoundException("Usuario no encontrado");
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number) {
        this.userRepository.delete({
            id: id,

        })
        return {
            message: `Usuario ${id} eliminado...`
        }
    }

    async getReservationsByUser(userId: number) {
        // validamos que e xista el usuario
        const user = await this.findOneById(userId);

        // buscamos sus reservas
        return await this.dataSource.getRepository(ReservationSeat).find({
            where: { user: { id: user.id } },
            relations: [
                'timetable',
                'timetable.bus',
                'timetable.bus.route',
                'user'
            ],
            order: {
                id: 'DESC'
            }
        });
    }
}
