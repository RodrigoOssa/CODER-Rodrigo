import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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
