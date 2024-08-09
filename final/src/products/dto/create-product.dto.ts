import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "src/users/schemas/user.schema"

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    title: String

    @IsString()
    @IsNotEmpty()
    description: String

    @IsString()
    @IsNotEmpty()
    code: String

    @IsNumber()
    @IsNotEmpty()
    price: Number

    @IsBoolean()
    @IsNotEmpty()
    status: Boolean = true

    @IsNumber()
    @IsNotEmpty()
    stock: Number

    @IsString()
    @IsNotEmpty()
    category: String

    @IsNotEmpty()
    owner: User

    @IsString()
    thumbnails?: String
}
