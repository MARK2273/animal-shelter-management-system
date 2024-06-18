import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { AnimalDescriptionService } from './animalDescription.service';
import { CreateAnimalDescriptionDto } from './dto/animalDescription.dto';
import { UpdateAnimalDescriptionDto } from './dto/animalDescriptionUpdate.dto';

@Controller('animaldescription')
export class AnimalDescriptionController {
  constructor(private animalDescriptionService: AnimalDescriptionService) {}

  @Get('/getall')
  async getAllMedications() {
    return this.animalDescriptionService.getAllAnimalDescription();
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAnimalDescription(
    @Body() animalDescriptionData: CreateAnimalDescriptionDto,
    @Res() res: Response,
  ) {
    return await this.animalDescriptionService.createAnimalDescription(
      animalDescriptionData,
      res,
    );
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateAnimalDescriptionDto: UpdateAnimalDescriptionDto,
    @Res() res: Response,
  ) {
    return this.animalDescriptionService.updateAnimalDescription(
      id,
      updateAnimalDescriptionDto,
      res,
    );
  }

  @Delete('/delete/:id')
  async deleteMedication(@Param() id: number, @Res() res: Response) {
    return await this.animalDescriptionService.deleteAnimalDescription(id, res);
  }
}
