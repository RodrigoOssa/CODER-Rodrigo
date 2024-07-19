import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { UpdateUser } from './dto/update-user.dto';
@Injectable()
export class UsersService {

    getUsers() {
        return "Todos los usuarios"
    }

    createUser(user: User) {
        console.log(user)
        return user
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
