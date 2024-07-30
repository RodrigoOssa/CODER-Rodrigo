import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('/img')
  @UseInterceptors(FileInterceptor('thumbnails'))
  uploadImage(
    @UploadedFile() img: Express.Multer.File
  ) {
    console.log(img)
    return img
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);

  }

  @Put(':id')
  Update(@Param('id') id: String, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: String, @Body() updateProductDto: Partial<UpdateProductDto>) {
    return this.productsService.partialUpdate(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: String) {
    return await this.productsService.remove(id);
  }
}
