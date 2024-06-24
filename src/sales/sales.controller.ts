import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/sale.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}


  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'The sale has been successfully created.', type: CreateSaleDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    console.log('c',createSaleDto);
     await this.salesService.createSale(createSaleDto);
  }

  @Get(':month/category/:category')
  findAll(@Param('month') month: number,@Param('category') category: string,) {
    console.log('c', category);
    return this.salesService.getSalebyCategoryAndMonth(month,category);
  }

}
