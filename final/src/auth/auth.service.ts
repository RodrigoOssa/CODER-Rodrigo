import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService) { }

    async singIn(userEmail: string, password: string) {
        const user = await this.usersServices.findOne(userEmail);
        if (user?.password === password) {
            const { password, ...result } = user;
            //Acá hay que generar y mandar el token
            return result
        } else {
            throw new UnauthorizedException();
        }
    }
}
