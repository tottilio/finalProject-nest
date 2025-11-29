import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { Admin } from 'src/admins/entities/admins.entity';
import { User } from 'src/users/entities/users.entity';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
 imports: [
    TypeOrmModule.forFeature([Admin, User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "secret123",
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminJwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
