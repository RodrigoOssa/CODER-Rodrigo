import { IsArray, IsOptional } from "class-validator";

export class CreateCartDto {

    @IsArray()
    @IsOptional()
    products?: Array<{
        product: string,
        qty: number
    }>
}
