import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';

@Module({
  controllers: [CustomerController],
  providers: [CustomerRepository, CustomerService],
  imports: [TypeOrmModule.forFeature([CustomerRepository])],
})
export class CustomerModule {}
