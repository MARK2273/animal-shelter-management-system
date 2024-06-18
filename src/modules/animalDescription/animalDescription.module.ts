import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalDescriptionController } from './animalDescription.controller';
import { AnimalDescriptionService } from './animalDescription.service';
import { AnimalDescriptionRepository } from './animalDescription.repository';

@Module({
  controllers: [AnimalDescriptionController],
  providers: [AnimalDescriptionRepository, AnimalDescriptionService],
  imports: [TypeOrmModule.forFeature([AnimalDescriptionRepository])],
})
export class AnimalDescriptionModule {}
