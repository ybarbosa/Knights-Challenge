import { Controller, Get } from '@nestjs/common';
import { WeaponService } from './weapon.service';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly appService: WeaponService) {}

  @Get('')
  async findAll() {
    return await this.appService.findAll();
  }
}
