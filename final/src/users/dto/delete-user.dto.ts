import { IsNotEmpty, IsString } from "class-validator";

export class DeleteUser {

    @IsString()
    @IsNotEmpty()
    id: String

}