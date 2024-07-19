import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ProductObject } from "./product-object.dto";

export class CreateCartDto {

    @IsArray()
    @IsNotEmpty()
    products: Array<ProductObject>

}
