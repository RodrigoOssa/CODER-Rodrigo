import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './createCart.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {

    @IsNumber()
    @IsOptional()
    qty: number
}
