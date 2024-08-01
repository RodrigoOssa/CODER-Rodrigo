import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authServices: AuthService) { }

    @Post('/login')
    async login(
        @Body() credentials: LoginDTO
    ) {
        const { email, password } = credentials;
        console.log(credentials);
        return this.authServices.singIn(email, password)
    }
}
