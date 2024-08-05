import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authServices: AuthService,
        private readonly userServices: UsersService
    ) { }

    @Get('/login')
    async login(
        @Body() credentials: LoginDTO
    ) {
        const { email, password } = credentials;
        console.log(credentials);
        return this.authServices.singIn(email, password)
    }

    @Post('/register')
    async register(
        @Body() newUserData: CreateUserDto
    ) {
        return this.userServices.create(newUserData)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/test')
    async test(@Request() req) {
        return {
            status: "Autorizado",
            user: req.user
        }
    }
}
