import { Controller, Get, Post,Res, Body,HttpStatus, Param, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/sale.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse,ApiBody, ApiCreatedResponse, ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  //Create a new sale
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiCreatedResponse({ description: 'The sale has been successfully created.' })
  @ApiResponse({ status: 201, description: 'The sale has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ type: CreateSaleDto })
  @Post()
  async create(@Body() createSaleDto: CreateSaleDto, @Res() res: Response) {
    try{
      const sale = await this.salesService.createSale(createSaleDto);
      return res.status(HttpStatus.CREATED).json({ok:true,status:201, message: 'The sale has been successfully created.',data:sale})
    }catch(error){
      let item= error.message
      if(error.status==404 && item.includes('Product') || item.includes('User') ) {
         return res.status(HttpStatus.NOT_FOUND).json({ok:false,status:404, message:`${item} not found`,data:[]});
        }else{
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,status:500, message:item,data:[]});
        }
    }
  }

  //Find Sale By Category and month
  @ApiOperation({ summary: 'Find Sale By Category and month' })
  @ApiParam({ name: 'month', required: true, description: 'month of year' })
  @ApiParam({ name: 'category', required: true, description: 'Category of producto' })
  @ApiResponse({ status: 200, description: 'Sales' })
  @ApiResponse({ status: 400, description: 'Sales not found.' })
  @Get(':month/category/:category')
  async findSalesByMonthAndCategory(@Param('month') month: number,@Param('category') category: string,@Res() res: Response) {
  try{
      const sales= await  this.salesService.getSalebyCategoryAndMonth(month,category);
     if(sales.length>0){
        return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'Sales', data:sales});
     }else{
        return res.status(HttpStatus.BAD_REQUEST).json({ok:false,status:404, message: 'Sales not found.', data:[]});
     }
    }catch(error){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
    }
  }

}
