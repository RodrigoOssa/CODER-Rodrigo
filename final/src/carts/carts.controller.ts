import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

@Controller('/api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Post(':cid/product/:pid')
  addProduct(
    @Param('cid') cid: string,
    @Param('pid') pid: string
  ) {
    console.log(cid, pid)
    return this.cartsService.addProduct(cid, pid);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':cid')
  findOne(@Param('cid') cid: string) {
    return this.cartsService.findOne(cid);
  }

  @Patch(':cid/product/:pid')
  partialUpdate(
    @Param('cid') cid: string,
    @Param('pid') pid: string,
    @Body() qty: UpdateCartDto
  ) {
    return this.cartsService.partialUpdate(cid, pid, qty);
  }

  @Put(':cid')
  update(
    @Param('cid') cid: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return this.cartsService.update(cid, updateCartDto);
  }

  @Delete(':cid')
  remove(@Param('cid') cid: string) {
    return this.cartsService.remove(cid);
  }
}
