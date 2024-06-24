import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartitemService } from './cartitem.service';
import { CreateCartItemDto } from './dto/cartitem.dto';


@Controller('cartitem')
export class CartitemController {
  constructor(private readonly cartitemService: CartitemService) {}

  @Post()
  create(@Body() createCartitemDto: CreateCartItemDto) {
    return this.cartitemService.create(createCartitemDto);
  }

  @Get()
  findAll() {
    return this.cartitemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartitemService.findOne(+id);
  }
}
