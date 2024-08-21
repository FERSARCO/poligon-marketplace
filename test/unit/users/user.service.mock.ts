
import{CreateUserDto} from '../../../src/users/dto/createUser.dto'
import { User } from '../../../src/users/entities/user.entity';
import { PaginationDto } from '../../../src/common/dto/pagination.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from '../../../src/cartitem/entities/cartitem.entity';

export class UserServiceMock {
    static create(create: any) {
      throw new Error('Method not implemented.');
    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        return Promise.resolve({
            id: 1,
            carts: [],
            sales: [],
            ...createUserDto
        })
    }

    async findAll(paginationDto:PaginationDto): Promise<any> {
        return Promise.resolve([
          {
            id: 1,
            name: "te",
            email: "test@gmail",
            password:"123",
            carts:[],
            sales:[],
            ...User
,
          },
        ]);
    }
}