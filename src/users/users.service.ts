import { Injectable, InternalServerErrorException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        const existing = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        });

        if (existing) {
            throw new BadRequestException('Email already in use');
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
        return this.userRepository.findOne({where:{id}});
    }

    async remove(id: number) {
        this.userRepository.delete({
            id: id,

        })
        return {
            message: `Usuario ${id} eliminado`
        }
    }

}
