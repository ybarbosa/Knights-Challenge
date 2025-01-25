import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestKnightCreateDto } from './dto/create.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AttributeName } from '@prisma/client';

@Injectable()
export class KnightsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(body: RequestKnightCreateDto) {
    const weapons = body.weapons.map(({ isEquipped, id }) => ({
      isEquipped,
      id,
    }));

    if (weapons.every((isEquipped) => isEquipped)) {
      throw new BadRequestException(
        'Only one weapon can be equipped by a knight.',
      );
    }

    const knight = await this.prismaService.knight.findUnique({
      select: {
        id: true,
      },
      where: {
        nickname: body.nickName,
      },
    });

    if (!knight) {
      throw new BadRequestException('Knight not found');
    }

    const atribuitesDefault = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };

    const newKnight = await this.prismaService.knight.create({
      data: {
        name: body.name,
        nickname: body.nickName,
        birthday: body.birthday,
        keyAttribute: AttributeName[body.keyAttribute],
        weapons,
        attributes: atribuitesDefault,
      },
    });

    return {
      statusCode: 201,
      message: 'Knight created successfully',
      data: newKnight,
      error: '',
    };
  }
}
