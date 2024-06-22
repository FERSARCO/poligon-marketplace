import { PartialType } from '@nestjs/swagger';
import { CreateCartitemDto } from './create-cartitem.dto';

export class UpdateCartitemDto extends PartialType(CreateCartitemDto) {}
