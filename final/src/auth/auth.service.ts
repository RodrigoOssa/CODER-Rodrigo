import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AccessTokenDTO } from './dto/accessToken.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_MODEL') private userModel: Model<User>,
        private readonly jwtService: JwtService
    ) { }

    async singIn(userEmail: string, password: string): Promise<AccessTokenDTO> {
        const user = await this.userModel.findOne({ email: userEmail });
        if (user?.password === password) {
            const { _id, first_name, last_name, age, email, role } = user;
            const userData = {
                _id,
                first_name,
                last_name,
                age,
                email,
                role
            }
            const token = {
                access_token: await this.jwtService.signAsync(userData)
            };
            console.log(token)
            return token
        } else {
            console.log(user)
            throw new UnauthorizedException();
        }
    }
}
