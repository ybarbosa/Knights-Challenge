import { Module } from '@nestjs/common';
import { KnightsController } from './knights/knights.controller';
import { KnightsService } from './knights/knights.service';

@Module({
  imports: [],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class AppModule {}
