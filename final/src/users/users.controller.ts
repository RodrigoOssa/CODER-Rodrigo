import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/interfaces/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(RolesGuard)
    @Roles()
    @Post()
    create(@Body() createProductDto: CreateUserDto) {
        return this.usersService.create(createProductDto);
    }

    @Roles()
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Roles()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);

    }

    @Roles()
    @Put(':id')
    Update(@Param('id') id: String, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Patch('/premium/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    upgradePremium(
        @Param('id') uid: string
    ) {
        return this.usersService.upgradePremium(uid)
    }

    /* @Patch(':id')
    partialUpdate(@Param('id') id: String, @Body() updateUserDto: Partial<UpdateUserDto>) {
        return this.usersService.partialUpdate(id, updateUserDto);
    } */


    @Roles()
    @Delete(':id')
    async remove(@Param('id') id: String) {
        return await this.usersService.remove(id);
    }
}
