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
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/createStaff.dto';
import { ShelterService } from '../shelter/shelter.service';
import { UpdateStaffDto } from './dto/staffUpdate.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindUser } from './dto/findStaff.dto';
import { JwtService } from '@nestjs/jwt';
import generalResponse from 'src/helper/genrelResponse.helper';
import { AuthGaurd } from './staff.guard';

@Controller('staff')
export class StaffController {
  constructor(
    private staffService: StaffService,
    private shelterService: ShelterService,
    private jwtService: JwtService,
  ) {}

  @Get('/getall/:id')
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async getAllStaff(@Param('id') id: number) {
    return this.staffService.getStaffByShelterId(id);
  }

  @Post('/create')
  @HttpCode(200)
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateStaffDto,
  })
  @UsePipes(ValidationPipe)
  async createStaff(@Body() staffData: CreateStaffDto, @Res() res: Response) {
    const shelter = await this.shelterService.findShelterId(
      staffData.sheltersId,
    );

    return await this.staffService.createStaff(staffData, shelter, res);
  }

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Put('/update/:id')
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: UpdateStaffDto,
  })
  async updateMedication(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
    @Res() res: Response,
  ) {
    return this.staffService.updateStaff(id, updateStaffDto, res);
  }

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @Delete('/delete/:id')
  @ApiTags('Staff')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({
    name: 'id',
  })
  async deleteStaff(@Param() id: number, @Res() res: Response) {
    return await this.staffService.deleteStaff(id, res);
  }

  @ApiTags('Auth')
  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  async login(@Body() userdata: FindUser, @Res() response: Response) {
    const data = await this.staffService.verifyUser(userdata);

    if (data.success) {
      try {
        const token = await this.jwtService.signAsync(userdata);

        return response.status(201).json({
          success: true,
          message: `User login successfully...`,
          token: token,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return generalResponse(
        response,
        data.statusCode,
        data.message,
        data.result,
      );
    }
  }
}
