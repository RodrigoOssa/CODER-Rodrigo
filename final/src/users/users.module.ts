import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  imports: [DatabaseModule, CartsModule],
  exports: [...userProviders, CartsModule],
})
export class UsersModule { }
