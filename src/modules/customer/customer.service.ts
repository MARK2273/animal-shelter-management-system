import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/CreateCustomer.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async getAllCustomer(): Promise<Customer[]> {
    return this.customerRepository.find({
      select: {
        fname: true,
        lname: true,
        email: true,
        contact: true,
        address: true,
      },
    });
  }

  async createCustomer(
    customer: CreateCustomerDto,
    res: Response,
  ): Promise<void> {
    try {
      const validCustomer: Customer = await this.findCustomerByEmail(
        customer.email,
      );
      if (validCustomer) {
        return generalResponse(
          res,
          [],
          'Email already exists',
          'error',
          true,
          400,
        );
      } else {
        const data: CreateCustomerDto & Customer =
          await this.customerRepository.save(customer);
        const createdCustomer: {
          id: number;
          'First Name': string;
          'Last Name': string;
          Email: string;
          contact: string;
        } = {
          id: data.id,
          'First Name': data.fname,
          'Last Name': data.lname,
          Email: data.email,
          contact: data.contact,
        };
        return generalResponse(
          res,
          createdCustomer,
          'Customer created successfully',
          'success',
          true,
          201,
        );
      }
    } catch (error) {
      return generalResponse(
        res,
        error,
        'Something went wrong in Creating Customer',
        'error',
        true,
        500,
      );
    }
  }

  async findCustomerByEmail(email: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { email },
      select: {
        id: true,
      },
    });
    return customer;
  }

  async findCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['donation'],
    });
    return customer;
  }
}
