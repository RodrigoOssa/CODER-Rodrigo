import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, Min } from "class-validator"
import { Cart } from "src/carts/schemas/cart.schema"

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

    @IsArray()
    @IsOptional()
    cart: Cart[]
}
