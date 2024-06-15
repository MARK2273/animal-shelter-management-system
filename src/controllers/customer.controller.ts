import { Controller, Get } from '@nestjs/common';
// import { Request } from "express";

@Controller()
export class customerController {
  @Get('/allCustomer')
  findAll(): string {
    return 'Customer Inforamtion...';
  }
}
