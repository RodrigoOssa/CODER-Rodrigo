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

    getTest(): string {
        return "Esto es un mensaje de pruebas"
    }

    createTest(): string {
        return "Esto es un ejemplo de crear"
    }

    updateTest(): string {
        return "Esto es un ejemplo de actualizar"
    }

    deleteTest(): string {
        return "Esto es un ejemplo de eliminar"
    }

    updateStatusTest(): string {
        return "Esto es un ejemplo de actualizar una parte"
    }
}
