import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_MODEL') private userModel: Model<User>
    ) { }

    async singIn(userEmail: string, password: string) {
        const user = await this.userModel.findOne({ email: userEmail });
        if (user?.password === password) {
            const { password, ...result } = user;
            //Acá hay que generar y mandar el token
            return result
        } else {
            throw new UnauthorizedException();
        }
    }
}
