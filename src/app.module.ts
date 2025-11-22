import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { RoutesModule } from './routes/routes.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [AuthModule, AdminsModule, TicketsModule, UsersModule, RoutesModule, LocationsModule], // DB
  controllers: [],
  providers: [],
})
export class AppModule {}
