import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { cartProvider } from './cart.providers';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from 'src/products/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CartsController],
  providers: [CartsService, ...cartProvider, ...productProviders],
})
export class CartsModule { }
