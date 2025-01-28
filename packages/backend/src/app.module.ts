import { Module } from '@nestjs/common';
import { KnightsController } from './domain/knights/knights.controller';
import { KnightsService } from './domain/knights/knights.service';
import { PrismaModule } from './domain/prisma/prisma.module';
import { WeaponController } from './domain/wepons/weapon.controller';
import { WeaponService } from './domain/wepons/weapon.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [PrismaModule],
  controllers: [KnightsController, WeaponController],
  providers: [
    KnightsService,
    WeaponService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
