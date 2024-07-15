import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {

    constructor(private UsersService: UsersService) { }

    @Get('/test')
    getTest() {
        return this.UsersService.getTest()
    }

    @Put('/test')
    putTest() {
        //logica
    }

    @Post('/test')
    postTest() {
        //logica
    }

    @Delete('/test')
    deleteTest() {
        //logica
    }

    @Patch('/test')
    patchTest() {
        //logica
    }

}
