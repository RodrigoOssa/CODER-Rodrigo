import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { Product } from 'src/products/schemas/product.schema';
import { Type } from 'class-transformer';

@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_MODEL') private cartModel: Model<Cart>,
    @Inject('PRODUCT_MODEL') private productModel: Model<Product>) { }

  async create(createCartDto: any): Promise<Cart> {
    const newCart = new this.cartModel({ products: [] });
    try {
      if (createCartDto.products?.length > 0) {
        for (const item of createCartDto.products) {
          const existProduct = await this.productModel.findById(item.product);
          if (existProduct) newCart.products.push({ qty: item.qty, product: existProduct });
        }
      }
      return await newCart.save()
    } catch (e) {
      throw new ConflictException(e.errmsg);
    }
  }

  async addProduct(cid: string, pid: string): Promise<Cart> {
    const existCart = await this.cartModel.findById(cid)/* .populate("products.product") */;
    /* 
    Revisa si el producto existe en cart. De no existir corrobora que exista el producto en si y lo agrega al cart. De existir el producto en el cart suma 1 el qty
    */
    try {
      const productIndex = existCart.products.findIndex(
        element => element.product._id.toString() === pid
      );
      if (productIndex >= 0) {
        existCart.products[productIndex] = {
          qty: existCart.products[productIndex].qty + 1,
          product: existCart.products[productIndex].product
        }
        return await existCart.save()

      } else {
        const existProduct = await this.productModel.findById(pid);
        if (existProduct) {
          existCart.products.push({ qty: 1, product: existProduct })
        }
      }
      return await existCart.save()
    } catch (e) {
      throw new ConflictException(e.errmsg);
    }
  }

  async findAll(): Promise<Cart[]> {
    try {
      return this.cartModel.find()
    } catch (e) {
      throw new NotFoundException(e.errmsg)
    }
  }

  async findOne(cid: String): Promise<Cart> {
    try {
      const findCart = await this.cartModel.findById(cid);
      if (findCart) {
        return findCart
      } else {
        throw new NotFoundException(`Cart with ID ${cid} not found`);
      }
    } catch {
      throw new NotFoundException(`Cart with ID ${cid} not found`);
    }
  }

  async partialUpdate(cid: String, pid: String, qty: UpdateCartDto): Promise<Cart> {
    try {
      const updateCart = await this.cartModel.findById(cid);
      const indexProduct = updateCart.products.findIndex(
        product => product.product._id.toString() === pid
      )
      if (indexProduct >= 0) updateCart.products[indexProduct].qty = qty.qty;
      if (updateCart) {
        return await updateCart.save()
      } else {
        throw new NotFoundException(`Cart with ID ${cid} not found`)
      }
    } catch (e) {
      throw new NotFoundException(`Cart with ID ${cid} not found`)
    }
  }

  async update(cid: String, updateCartDto: UpdateCartDto)/* : Promise<Cart> */ {
    const listProductID: Array<any> = updateCartDto.products.map(element => new Types.ObjectId(element.product));
    try {
      const someProducts = await this.productModel.find({ _id: { $in: listProductID } });
      const newProducts: Cart = { products: [] }
      updateCartDto.products.forEach(item => {
        const toCompare = new Types.ObjectId(item.product);
        const existProduct = someProducts.find(items => toCompare.equals(items._id));
        if (existProduct) {
          newProducts.products.push({ qty: item.qty, product: existProduct })
        }
      })
      const updateCart = await this.cartModel.findByIdAndUpdate(cid, newProducts, { new: true });
      if (updateCart) {
        return updateCart
      } else {
        throw new NotFoundException(`Cart with ID ${cid} not found`)
      }
    } catch (e) {
      throw new NotFoundException(`Cart with ID ${cid} not found`)
    }
  }

  async remove(cid: String): Promise<Cart> {
    const deleteCart = await this.cartModel.findByIdAndDelete(cid).exec()
    if (deleteCart) {
      return deleteCart
    } else {
      throw new NotFoundException(`Cart with ID ${cid} not found`)
    }
  }
}
