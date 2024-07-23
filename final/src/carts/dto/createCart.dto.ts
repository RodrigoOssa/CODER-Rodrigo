import { IsArray, IsOptional } from "class-validator";

export class CreateCartDto {

    @IsArray()
    @IsOptional()
    products?: Array<{
        product: String,
        qty: number
    }>
}
