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
  // UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AnimalDescriptionService } from './animalDescription.service';
import { CreateAnimalDescriptionDto } from './dto/animalDescription.dto';
import { UpdateAnimalDescriptionDto } from './dto/animalDescriptionUpdate.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
// import { AuthGaurd } from '../staff/staff.guard';

@Controller('animaldescription')
export class AnimalDescriptionController {
  constructor(private animalDescriptionService: AnimalDescriptionService) {}

  @Get('/getall')
  @ApiTags('Animal Description')
  async getAllMedications() {
    return this.animalDescriptionService.getAllAnimalDescription();
  }

  // @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Post('/create')
  @HttpCode(200)
  @ApiTags('Animal Description')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateAnimalDescriptionDto,
  })
  @UsePipes(ValidationPipe)
  async createAnimalDescription(
    @Body() animalDescriptionData: CreateAnimalDescriptionDto,
    @Res() res: Response,
  ): Promise<void> {
    return await this.animalDescriptionService.createAnimalDescription(
      animalDescriptionData,
      res,
    );
  }

  // @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Put('/update/:id')
  @ApiTags('Animal Description')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdateAnimalDescriptionDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateAnimalDescriptionDto: UpdateAnimalDescriptionDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.animalDescriptionService.updateAnimalDescription(
      id,
      updateAnimalDescriptionDto,
      res,
    );
  }

  // @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Delete('/delete/:id')
  @ApiTags('Animal Description')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async deleteAnimalDescription(@Param() id: number, @Res() res: Response) {
    return await this.animalDescriptionService.deleteAnimalDescription(id, res);
  }
}
