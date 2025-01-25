import { Module } from '@nestjs/common';
import { KnightsController } from './domain/knights/knights.controller';
import { KnightsService } from './domain/knights/knights.service';
import { PrismaModule } from './domain/prisma/prisma.module';
import { WeaponController } from './domain/wepons/weapon.controller';
import { WeaponService } from './domain/wepons/weapon.service';

@Module({
  imports: [PrismaModule],
  controllers: [KnightsController, WeaponController],
  providers: [KnightsService, WeaponService],
})
export class AppModule {}
