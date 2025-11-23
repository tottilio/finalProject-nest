import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admins.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>
    ) { }

    async create(createAdminDto: CreateAdminDto) {
        const existing = await this.adminsRepository.findOne({
            where: { email: createAdminDto.email }
        });

        if (existing) {
            throw new BadRequestException('Este correo ya está registrado');
        }

        const hashed = await bcrypt.hash(createAdminDto.password, 10);

        const user = this.adminsRepository.create({
            ...createAdminDto,
            password: hashed,
        });

        return this.adminsRepository.save(user);
    }

    findAll(){
        return this.adminsRepository.find();
    }

    async findOneById(id:number){
        const admin = await this.adminsRepository.findOne({
            where:{id}
        })
        if(!admin) throw new NotFoundException("Admin no encontrado")
            return admin
    }

    async update(id:number, updateAdminDto: UpdateAdminDto){
        if(updateAdminDto.password){
            updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10)
        }
        await this.adminsRepository.update(id,updateAdminDto)
        return this.adminsRepository.findOne({where:{id}})
    }

    async remove (id:number){
        this.adminsRepository.delete({
            id:id
        })
        return {message: `Admin ${id} eliminado...`}
    }
}
