import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('/api/users')
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
