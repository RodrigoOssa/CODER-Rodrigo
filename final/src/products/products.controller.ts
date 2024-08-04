import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { Express } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/interfaces/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('/img/:pid')
  @UseInterceptors(FileInterceptor('thumbnails'))
  uploadImage(
    @UploadedFile() img: Express.Multer.File,
    @Param('pid') pid: string
  ) {
    const imagePath = `/products/img/${img?.filename}`
    const updateThumbnails: UpdateProductDto = { thumbnails: imagePath }
    return this.productsService.uploadImage(pid, updateThumbnails)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(Role.USER)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);

  }

  @Put(':id')
  Update(
    @Param('id') id: String,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: String,
    @Body() updateProductDto: Partial<UpdateProductDto>
  ) {
    return this.productsService.partialUpdate(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: String) {
    return await this.productsService.remove(id);
  }
}
