import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Weapon } from '@prisma/client';
import { ResponseStruct } from '../common/responseStruct';

@Injectable()
export class WeaponService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<ResponseStruct<Weapon[]>> {
    const weapons = await this.prismaService.weapon.findMany();

    return {
      statusCode: 200,
      message: 'Weapons found successfully',
      data: weapons,
      error: '',
    };
  }
}
