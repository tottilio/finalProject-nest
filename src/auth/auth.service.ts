import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admins/entities/admins.entity';
import { User } from 'src/users/entities/users.entity';
import { SignupAdminDto } from './dto/singup-admins.dto';
import { LoginAdminDto } from './dto/login-admins.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, private jwtServicce: JwtService
  ) { }

  async singupAdmin(signupAdminDto: SignupAdminDto) {
    const exists = await this.adminRepository.findOne({ where: { email: signupAdminDto.email } })

    if (exists) throw new BadRequestException('El email ya está registrado para un admin');

    const hashed = await bcrypt.hash(signupAdminDto.password, 10);

    const admin = this.adminRepository.create({
      name: signupAdminDto.name,
      lastname: signupAdminDto.lastname,
      email: signupAdminDto.email,
      password: hashed,
    });

    await this.adminRepository.save(admin);

    return { message: 'Admin creado correctamente' };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({ where: { email: loginAdminDto.email } });

    if (!admin) throw new UnauthorizedException('Credenciales inválidas')

    const isMatch = await bcrypt.compare(loginAdminDto.password, admin.password);

    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: admin.id,
      email: admin.email,
      type: 'admin',
    };

    const token = await this.jwtServicce.signAsync(payload);

    return { access_token: token };
  }

  // --> USERS LOGIN Y SIGNUP 
  async registerUser(registerUserDto: RegisterUserDto) {
    const exists = await this.userRepository.findOne({ where: { email: registerUserDto.email } });
    if (exists) throw new ConflictException('El usuario ya existe');

    const hashed = await bcrypt.hash(registerUserDto.password, 10);

    const user = this.userRepository.create({
      ...registerUserDto,
      password: hashed,
    });

    await this.userRepository.save(user);
    return { message: 'Usuario registrado', user: { id: user.id, email: user.email } };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(loginUserDto.password, user.password);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwtServicce.sign({
      sub: user.id,
      role: 'user',
    });

    return { message: 'Login correcto', token };
  }

} 
