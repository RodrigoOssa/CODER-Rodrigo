import { CreateProductDto } from './dto/create-product.dto';
import { ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductInterface } from './interfaces/product.interface';
import { RemoveDTO } from './dto/remove.dto';
import { SUCCESS_MSG } from 'src/constants/statusMessages';
import { ResponseProducts } from './interfaces/response.interface';
import { Role } from 'src/auth/interfaces/role.enum';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

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
      return this.productModel.find().populate('owner')
    } catch (e) {
      throw new NotFoundException(e.errmsg)
    }
  }

  async findOne(id: String): Promise<ProductInterface> {
    try {
      const findProduct = await this.productModel.findById(id);
      if (findProduct) {
        return findProduct
      } else {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async update(id: String, updateProductDto: UpdateProductDto): Promise<ProductInterface> {
    try {
      const updateProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
      if (updateProduct) {
        return updateProduct
      } else {
        throw new NotFoundException(`Product with ID ${id} not found`)
      }
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
  }

  async partialUpdate(id: String, updateProductDto: UpdateProductDto): Promise<ProductInterface> {
    try {
      const updateProduct = await this.productModel.findByIdAndUpdate(id, { $set: updateProductDto }, { new: true })
      if (updateProduct) {
        return updateProduct
      } else {
        throw new NotFoundException(`Product with ID ${id} not found`)
      }
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException();
    }
  }

  async remove(id: String, user: CreateUserDto): Promise<ResponseProducts> {
    try {
      const deleteProduct = await this.productModel.findById(id);
      const res = async () => ({
        status: SUCCESS_MSG.DELETED,
        payload: await this.productModel.findByIdAndDelete(id).exec()
      })

      if (!deleteProduct) throw new NotFoundException(`Product with ID ${id} not found`)
      if (user.role === Role.ADMIN) return res();
      if (deleteProduct.owner.toString() !== user.id) throw new ForbiddenException("Do not have permission to delete the Product");

      return res();
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      if (e instanceof ForbiddenException) throw e;
      throw new InternalServerErrorException()
    }
  }

  async uploadImage(pid: string, thumbnailsUpdate: UpdateProductDto): Promise<ProductInterface> {
    try {
      const updateImg = await this.productModel.findByIdAndUpdate(pid, { $set: thumbnailsUpdate }, { new: true })
      console.log("Estado de la carga", updateImg)
      if (updateImg) {
        return updateImg
      } else {
        throw new NotFoundException(`Product with ID ${pid} not found`)
      }
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException();
    }
  }
}
