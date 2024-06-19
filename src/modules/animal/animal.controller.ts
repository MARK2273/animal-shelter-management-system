import { CreateAnimalDto } from './dto/animal.dto';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { AnimalService } from './animal.service';
import { BreedService } from '../breed/breed.service';
import generalResponse from 'src/helper/genrelResponse.helper';
// import { CreateAnimalDto } from './dto/CreateAnimalDto.dto';
import { AnimalTypeService } from '../animalType/animalType.service';
import { AnimalDescriptionService } from '../animalDescription/animalDescription.service';
import { UpdateAnimalDto } from './dto/animalUpdate.dto';
import { ShelterService } from '../shelter/shelter.service';

@Controller('animal')
export class AnimalController {
  constructor(
    private animalService: AnimalService,
    private breedService: BreedService,
    private animalTypeService: AnimalTypeService,
    private animalDescriptionService: AnimalDescriptionService,
    private shelterService: ShelterService,
  ) {}

  @Get('/getall')
  getAllCustomer() {
    return this.animalService.getAllAnimals();
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() customerData: CreateAnimalDto,
    @Res() res: Response,
  ) {
    const breed = await this.breedService.findBreedId(customerData.breedId);
    const animalType = await this.animalTypeService.findAnimalTypeId(
      customerData.animalTypeId,
    );
    const animalDescription =
      await this.animalDescriptionService.findAnimalDescriptionId(
        customerData.animalDescriptionId,
      );
    const shelter = await this.shelterService.findShelterId(
      customerData.shelterId,
    );

    if (breed && animalType && animalDescription && shelter) {
      return await this.animalService.createAnimal(
        customerData,
        breed,
        animalType,
        animalDescription,
        shelter,
        res,
      );
    } else {
      return generalResponse(
        res,
        '',
        'Something Went Wrong',
        'error',
        true,
        400,
      );
    }
  }

  @Put('/update/:id')
  async updateAnimal(
    @Param('id') id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @Res() res: Response,
  ) {
    return this.animalService.updateAnimal(id, updateAnimalDto, res);
  }

  @Delete('/delete/:id')
  async deleteAnimal(@Param() id: number, @Res() res: Response) {
    return await this.animalService.deleteAnimal(id, res);
  }
}
