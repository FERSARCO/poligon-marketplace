import{CreateUserDto} from '../../../src/users/dto/createUser.dto'
import { User } from '../../../src/users/entities/user.entity';

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
}