import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Max, Min } from "class-validator"

export class UpdateUser {

    @IsNotEmpty()
    @IsString()
    id: string

    @IsString()
    @IsOptional()
    first_name?: String

    @IsString()
    @IsOptional()
    last_name?: String

    @IsNumber()
    @IsOptional()
    @Max(100)
    @Min(18)
    age?: Number

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: String

    @IsString()
    @IsOptional()
    role?: String

    @IsString()
    @IsOptional()
    password?: String
}
