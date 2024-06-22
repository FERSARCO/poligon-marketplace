import { Injectable } from '@nestjs/common';
import { CreateCartItemDto,UpdateCartItemDto } from './dto/cartitem.dto';


@Injectable()
export class CartitemService {
  create(createCartitemDto: CreateCartItemDto) {
    return 'This action adds a new cartitem';
  }

  findAll() {
    return `This action returns all cartitem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartitem`;
  }

  update(id: number, updateCartitemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartitem`;
  }
}
