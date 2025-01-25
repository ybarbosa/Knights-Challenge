import { Module } from '@nestjs/common';
import { KnightsController } from './domain/knights/knights.controller';
import { KnightsService } from './domain/knights/knights.service';
import { PrismaModule } from './domain/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class AppModule {}
