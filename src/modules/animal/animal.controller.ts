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
  // UseGuards,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Breed } from '../breed/breed.entity';
import { AnimalType } from '../animalType/animalType.entity';
import { AnimalDescription } from '../animalDescription/animalDescription.entity';
import { Shelter } from '../shelter/shelter.entity';
import { Animal } from './animal.entity';
// import { AuthGaurd } from '../staff/staff.guard';

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
  @ApiTags('Animal')
  getAllCustomer(): Promise<Animal[]> {
    return this.animalService.getAllAnimals();
  }

  // @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Post('/create')
  @HttpCode(200)
  @ApiTags('Animal')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateAnimalDto,
  })
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() customerData: CreateAnimalDto,
    @Res() res: Response,
  ): Promise<void> {
    const breed: Breed = await this.breedService.findBreedId(
      customerData.breedId,
    );
    const animalType: AnimalType =
      await this.animalTypeService.findAnimalTypeId(customerData.animalTypeId);
    const animalDescription: AnimalDescription =
      await this.animalDescriptionService.findAnimalDescriptionId(
        customerData.animalDescriptionId,
      );
    const shelter: Shelter = await this.shelterService.findShelterId(
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

  // @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Put('/update/:id')
  @ApiTags('Animal')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdateAnimalDto,
  })
  async updateAnimal(
    @Param('id') id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,

    @Res() res: Response,
  ): Promise<void> {
    return this.animalService.updateAnimal(id, updateAnimalDto, res);
  }

  // @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Delete('/delete/:id')
  @ApiTags('Animal')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async deleteAnimal(@Param() id: number, @Res() res: Response): Promise<void> {
    return await this.animalService.deleteAnimal(id, res);
  }
}
