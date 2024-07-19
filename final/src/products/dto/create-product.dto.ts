import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

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

    @IsString()
    @IsNotEmpty()
    thumbnails: String
}
