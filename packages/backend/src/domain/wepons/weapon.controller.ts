import { Controller, Get } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly appService: WeaponService) {}

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Get all weapons',
    example: {
      statusCode: 200,
      message: 'Success',
      error: '',
      data: [
        {
          id: '67953b46c0647da276604ffa',
          name: 'Excalibur',
          mod: 10,
          attr: 'strength',
        },
      ],
    },
  })
  async findAll() {
    return await this.appService.findAll();
  }
}
