import { Injectable } from '@nestjs/common';
import { User } from './users.interface';
@Injectable()
export class UsersService {

    getUsers() {
        return "Todos los usuarios"
    }

    createUser(user: User) {
        console.log(user)
        return user
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
