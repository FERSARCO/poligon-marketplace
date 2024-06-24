import { Controller, Get, Post, Body, Patch, Param, Delete,UsePipes,HttpStatus, ValidationPipe, UseGuards, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {

    const product= this.productsService.create(createProductDto);
  
  

  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products.', type: CreateProductDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Products not found.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  async findAll(@Res() res: Response) {
    try{
      const products= await this.productsService.findAll();
      if(products.length>0){
        return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'List of all products', data:products});
      }else{
        return res.status(HttpStatus.BAD_REQUEST).json({ok:false,status:400, message: 'Products not found.', data:[]});
      }
    }catch(error){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
    }
  }

  @ApiOperation({ summary: 'Get all products like name' })
  @ApiResponse({ status: 200, description: 'List of all products.', type: CreateProductDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Products not found like name' })
  @ApiParam({ name: 'name', type: 'string', description: 'User name' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get('search/:name')
  async findAllProductsLikeName(@Param('name') name: string, @Res() res: Response) {
    try{
    const products = await this.productsService.findAllByName(name);
      if(products.length>0){
        return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'List of all products', data:products});
      }else{
        return res.status(HttpStatus.BAD_REQUEST).json({ok:false,status:400, message: 'Products not found like name', data:[]});
      }
    }catch(error){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
    }
  }


  @ApiOperation({ summary: 'Get a single user by id' })
  @ApiResponse({ status: 200, description: 'Product Detail', type: CreateProductDto, isArray: true })
  @ApiResponse({ status: 400, description: 'Product not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
     
    if (isNaN(Number(id))) {
      return res.status(HttpStatus.BAD_REQUEST).json({ok:false,status:400, message: 'Invalid ID. The ID must be a number.', data:[]});
    }
    const product = await this.productsService.findOneById(id);
   try{
     if(product){
        return res.status(HttpStatus.OK).json({ok:true,status:200, message: 'Product Detail ', data:product});
     }else{
        return res.status(HttpStatus.BAD_REQUEST).json({ok:false,status:400, message: 'Product not found', data:[]});
     }
  }
   catch(error){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ok:false,statusCode:500, message:error.message,data:[]});
     }
  }


}
