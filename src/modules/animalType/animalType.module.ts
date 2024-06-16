import { Module } from '@nestjs/common';
import { AnimalTypeController } from './animalType.controller';
import { AnimalTypeService } from './animalType.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeRepository } from './animalType.repository';

@Module({
  controllers: [AnimalTypeController],
  providers: [AnimalTypeRepository, AnimalTypeService],
  imports: [TypeOrmModule.forFeature([AnimalTypeRepository])],
})
export class AnimalTypeModule {}
