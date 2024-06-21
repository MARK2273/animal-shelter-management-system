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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiTags('Customer')
  @Get('/getallcustomers')
  getAllCustomer(): Promise<Customer[]> {
    return this.customerService.getAllCustomer();
  }

  @Post('/create')
  @ApiTags('Customer')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateCustomerDto,
  })
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() customerData: CreateCustomerDto,
    @Res() res: Response,
  ): Promise<void> {
    return await this.customerService.createCustomer(customerData, res);
  }
}
