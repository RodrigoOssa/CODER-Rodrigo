import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { Express } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/interfaces/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/api/products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Roles(Role.ADMIN, Role.PREMIUM)
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

  @Roles(Role.ADMIN, Role.PREMIUM)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Roles()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);

  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @Put(':id')
  Update(
    @Param('id') id: String,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @Patch(':id')
  partialUpdate(
    @Param('id') id: String,
    @Body() updateProductDto: Partial<UpdateProductDto>
  ) {
    return this.productsService.partialUpdate(id, updateProductDto);
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @Delete(':id')
  async remove(@Param('id') id: String) {
    return await this.productsService.remove(id);
  }
}
