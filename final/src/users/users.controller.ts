import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/interfaces/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('/api/users')
@UseGuards(RolesGuard)
@Roles()
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() createProductDto: CreateUserDto) {
        return this.usersService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);

    }

    @Put(':id')
    Update(@Param('id') id: String, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: String, @Body() updateUserDto: Partial<UpdateUserDto>) {
        return this.usersService.partialUpdate(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: String) {
        return await this.usersService.remove(id);
    }
}
