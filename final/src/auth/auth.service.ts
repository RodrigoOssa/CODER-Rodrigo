import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDTO } from './dto/accessToken.dto';
import { UsersService } from 'src/users/users.service';
import { comapreHash, createHashPass } from 'src/utils/utils';
import { ERROR_MSG, SUCCESS_MSG } from 'src/constants/statusMessages';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async singIn(userEmail: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.findByLogin(userEmail);
            if (!user?.payload) {
                return {
                    status: "Error",
                    msg: "User not exist",
                    payload: null
                }
            }
            const validatePassworrd = await comapreHash(password, user.payload.password);
            if (!validatePassworrd) {
                throw new UnauthorizedException();
            }
            const userData = {
                id: user.payload._id,
                first_name: user.payload.first_name,
                last_name: user.payload.last_name,
                age: user.payload.age,
                email: user.payload.email,
                role: user.payload.role
            }
            return {
                status: SUCCESS_MSG.OK,
                payload: {
                    access_token: await this.jwtService.signAsync(userData)
                }
            }
        } catch {
            throw new UnauthorizedException();
        }
    }
}
