import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './product.providers';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Module({
  controllers: [ProductsController],
  imports: [
    DatabaseModule,
    MulterModule.register(multerConfig)
  ],
  providers: [
    ProductsService,
    ...productProviders
  ],
})
export class ProductsModule { }
