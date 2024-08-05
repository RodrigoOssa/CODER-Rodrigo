import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsString, Max, Min } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsNumber()
    @IsNotEmpty()
    @Max(100)
    @Min(18)
    age: Number

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    role: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsObject()
    cart: Object
}
