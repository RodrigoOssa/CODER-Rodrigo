import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ProductsCart } from "./productsCart.dto";

export class CreateCartDto {

    @IsArray()
    products: Array<ProductsCart>

}
