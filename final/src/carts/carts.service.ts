import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_MODEL') private cartModel: Model<Cart>) { }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const newCart = new this.cartModel(createCartDto);
    try {
      return await newCart.save()
    } catch (e) {
      throw new ConflictException(e.errmsg)
    }
  }

  async findAll(): Promise<Cart[]> {
    try {
      return this.cartModel.find()
    } catch (e) {
      throw new NotFoundException(e.errmsg)
    }
  }

  async findOne(id: String): Promise<Cart> {
    try {
      const findProduct = await this.cartModel.findById(id);
      if (findProduct) {
        return findProduct
      } else {
        throw new NotFoundException(`Cart with ID ${id} not found`);
      }
    } catch {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
  }

  async update(id: String, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      const updateCart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
      if (updateCart) {
        return updateCart
      } else {
        throw new NotFoundException(`Cart with ID ${id} not found`)
      }
    } catch (e) {
      throw new NotFoundException(`Cart with ID ${id} not found`)
    }
  }

  async partialUpdate(id: String, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      const updateCart = await this.cartModel.findByIdAndUpdate(id, { $set: updateCartDto }, { new: true })
      if (updateCart) {
        return updateCart
      } else {
        throw new NotFoundException(`Cart with ID ${id} not found`)
      }
    } catch (e) {
      throw new NotFoundException(`Cart with ID ${id} not found`)
    }
  }

  async remove(id: String): Promise<Cart> {
    const deleteCart = await this.cartModel.findByIdAndDelete(id).exec()
    if (deleteCart) {
      return deleteCart
    } else {
      throw new NotFoundException(`Cart with ID ${id} not found`)
    }
  }
}
