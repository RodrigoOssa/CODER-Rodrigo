import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { User } from './users.interface';

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
    createUser(@Body() user) {
        return this.UsersService.createUser(user)
    }

    /* @Put('/test')
    putTest() {
        return this.UsersService.updateTest()
    }


    @Delete('/test')
    deleteTest() {
        return this.UsersService.deleteTest()
    }

    @Patch('/test')
    patchTest() {
        return this.UsersService.updateStatusTest()
    }
 */
    @Get('/test')
    getTest(@Req() request: Request, @Res() response: Response) {
        return response.status(200).send(this.UsersService.getTest())
    }

    @Get('/test/:id')
    getParam(@Req() request: Request, @Res() response: Response) {
        return response.status(200).send(request.params)
    }

    @Put('/test')
    putTest() {
        return this.UsersService.updateTest()
    }

    @Post('/test')
    postTest() {
        return this.UsersService.createTest()
    }

    @Delete('/test')
    deleteTest() {
        return this.UsersService.deleteTest()
    }

    @Patch('/test')
    patchTest() {
        return this.UsersService.updateStatusTest()
    }

}
