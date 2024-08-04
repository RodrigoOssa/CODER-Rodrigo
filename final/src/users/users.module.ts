import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  imports: [DatabaseModule],
  exports: [...userProviders],
})
export class UsersModule { }
