import { ProductInterface } from "./product.interface";

export interface ResponseProducts {
    status: string,
    payload: ProductInterface | Array<ProductInterface>
}