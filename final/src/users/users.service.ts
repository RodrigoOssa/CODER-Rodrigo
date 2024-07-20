import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUser } from './dto/update-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>
    ) { }

    getUsers() {
        return "Retorna todos los usuarios"
    }

    async create(user: CreateUserDto): Promise<User> {
        const createUser = new this.userModel(user)
        console.log(createUser)
        if (createUser) {
            return createUser.save()
        }
    }

    updateUser(update_user: UpdateUser) {
        console.log(update_user)
        return update_user
    }

    deleteUser(id: String) {
        console.log(id)
        return id
    }
}
