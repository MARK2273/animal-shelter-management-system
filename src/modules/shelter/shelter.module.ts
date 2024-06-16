import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterRepository } from './shelter.repository';

@Module({
  controllers: [ShelterController],
  providers: [ShelterRepository, ShelterService],
  imports: [TypeOrmModule.forFeature([ShelterRepository])],
})
export class ShelterModule {}
