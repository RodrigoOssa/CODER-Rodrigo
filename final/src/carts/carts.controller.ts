import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':cid/product/:pid')
  addProduct(
    @Param('cid') cid: string,
    @Param('pid') pid: string
  ) {
    console.log(cid, pid)
    return this.cartsService.addProduct(cid, pid);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cid')
  findOne(@Param('cid') cid: string) {
    return this.cartsService.findOne(cid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':cid/product/:pid')
  partialUpdate(
    @Param('cid') cid: string,
    @Param('pid') pid: string,
    @Body() qty: UpdateCartDto
  ) {
    return this.cartsService.partialUpdate(cid, pid, qty);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':cid')
  update(
    @Param('cid') cid: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return this.cartsService.update(cid, updateCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':cid')
  remove(@Param('cid') cid: string) {
    return this.cartsService.remove(cid);
  }
}
