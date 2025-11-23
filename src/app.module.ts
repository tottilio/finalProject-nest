import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from './bus/bus.module';
import { BusTimeTableModule } from './bus-time-table/bus-time-table.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tottiadmin",
    password: "12345admin",
    database: "finalproject",
    entities:[],
    autoLoadEntities: true,
    synchronize: true,
  }), AuthModule, AdminsModule, UsersModule, RoutesModule, BusModule, BusTimeTableModule, ReservationsModule ], // DB
  controllers: [],
  providers: [],
})
export class AppModule {} 
