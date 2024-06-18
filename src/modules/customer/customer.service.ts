import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/CreateCustomer.dto';
import { Response } from 'express';
import generalResponse from 'src/helper/genrelResponse.helper';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  getAllCustomer() {
    return [1, 2, 3, 'from service'];
  }

  async createCustomer(customer: CreateCustomerDto, res: Response) {
    try {
      const validCustomer = await this.findCustomerByEmail(customer.email);
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
        const data = await this.customerRepository.save(customer);
        const createdCustomer = {
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

  async findCustomerByEmail(email: string) {
    const customer = await this.customerRepository.findOne({
      where: { email },
      select: {
        id: true,
      },
    });
    return customer;
  }
}
