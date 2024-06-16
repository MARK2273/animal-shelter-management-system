import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/CreateCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/getallcustomers')
  getAllCustomer() {
    return this.customerService.getAllCustomer();
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() customerData: CreateCustomerDto,
    @Res() res: Response,
  ) {
    return await this.customerService.createCustomer(customerData, res);
  }
}
