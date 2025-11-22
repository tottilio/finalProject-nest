import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { RoutesModule } from './routes/routes.module';
import { LocationsModule } from './locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tottiadmin",
    password: "12345admin",
    database: "final-project-nest",
    entities:[],
    autoLoadEntities: true,
    synchronize: true,
  }), AuthModule, AdminsModule, TicketsModule, UsersModule, RoutesModule, LocationsModule], // DB
  controllers: [],
  providers: [],
})
export class AppModule {} 
