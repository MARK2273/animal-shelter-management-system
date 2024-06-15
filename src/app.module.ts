import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customerController } from './controllers/customer.controller';

@Module({
  imports: [],
  controllers: [AppController, customerController],
  providers: [AppService],
})
export class AppModule {}
