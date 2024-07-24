import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsString, Max, Min } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    first_name: String

    @IsString()
    @IsNotEmpty()
    last_name: String

    @IsNumber()
    @IsNotEmpty()
    @Max(100)
    @Min(18)
    age: Number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: String

    @IsString()
    @IsNotEmpty()
    role: String

    @IsString()
    @IsNotEmpty()
    password: String

    @IsObject()
    cart: Object
}
