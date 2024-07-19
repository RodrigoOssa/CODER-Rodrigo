import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { User } from './dto/user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('/api/users')
export class UsersController {

    constructor(private UsersService: UsersService) { }

    /* @Get()
    getUsers(@Req() request: Request, @Res() response: Response) {
        return response.status(200).send("Devuelve los usuarios")
    } */

    @Get()
    getUsers(@Query() query: any) {
        console.log(query)
        return this.UsersService.getUsers()
    }

    @Get('/:id')
    getUserById(@Param('id') id: String) {
        console.log(id)
    }

    @Post()
    createUser(@Body() user: User) {
        return this.UsersService.createUser(user)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: String) {
        return this.UsersService.deleteUser(id)
    }

    @Put()
    updateUser(@Body() update_user: UpdateUser) {
        return this.UsersService.updateUser(update_user)
    }

    @Patch()
    updateItemUser(@Body() updateItemUser: UpdateUser) {
        return this.UsersService.updateUser(updateItemUser)
    }
}
