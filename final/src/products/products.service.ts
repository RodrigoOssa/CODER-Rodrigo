import { CreateProductDto } from './dto/create-product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductInterface } from './interfaces/product.interface';

@Injectable()
export class ProductsService {

  constructor(
    @Inject('PRODUCT_MODEL') private productModel: Model<Product>) { }

  async create(createProductDto: CreateProductDto): Promise<ProductInterface> {
    try {
      const newProduct = new this.productModel(createProductDto)
      console.log(createProductDto)
      return newProduct.save();
    } catch (e) {

    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: String) {
    return `This action returns a #${id} product`;
  }

  update(id: String, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: String) {
    return `This action removes a #${id} product`;
  }
}
