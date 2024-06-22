import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartitemService } from './cartitem.service';
import { CreateCartItemDto,UpdateCartItemDto } from './dto/cartitem.dto';


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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartitemDto: UpdateCartItemDto) {
    return this.cartitemService.update(+id, updateCartitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartitemService.remove(+id);
  }
}
