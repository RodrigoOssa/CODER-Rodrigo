import { CreateProductDto } from './dto/create-product.dto';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductInterface } from './interfaces/product.interface';

@Injectable()
export class ProductsService {

  constructor(
    @Inject('PRODUCT_MODEL') private productModel: Model<Product>) { }

  async create(createProductDto: CreateProductDto): Promise<ProductInterface> {
    const newProduct = new this.productModel(createProductDto);
    try {
      return await newProduct.save()
    } catch (e) {
      throw new ConflictException(e.errmsg)
    }
  }

  async findAll(): Promise<ProductInterface[]> {
    try {
      return this.productModel.find()
    } catch (e) {
      throw new NotFoundException(e.errmsg)
    }
  }

  async findOne(id: String): Promise<ProductInterface> {
    try {
      return await this.productModel.findById(id);
    } catch {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }

  async update(id: String, updateProductDto: UpdateProductDto): Promise<ProductInterface> {
    try {
      return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true })
    } catch (e) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }

  async partialUpdate(id: String, updateProductDto: UpdateProductDto): Promise<ProductInterface> {
    try {
      return await this.productModel.findByIdAndUpdate(id, { $set: updateProductDto }, { new: true })
    } catch (e) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }

  async remove(id: String): Promise<ProductInterface> {
    const deleteUser = await this.productModel.findByIdAndDelete(id).exec()
    if (deleteUser) {
      return deleteUser
    } else {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }
}
