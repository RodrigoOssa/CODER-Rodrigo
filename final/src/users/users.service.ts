import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    getTest() {
        return "Esto es un mensaje de pruebas"
    }
}