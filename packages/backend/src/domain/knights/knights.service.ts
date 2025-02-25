import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestKnightCreateDto } from './dto/create.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AttributeName, Knight, Weapon } from '@prisma/client';
import { differenceInCalendarYears } from 'date-fns';
import { RequestKnightUpdateDto } from './dto/update.dto';
import { ObjectId } from 'mongodb';
export interface IKnightFormatted {
  id: string;
  hero: boolean;
  name: string;
  attribute: string;
  weapons: number;
  birthday: number;
  attack: number;
  experance: number;
  nickName: string;
}

@Injectable()
export class KnightsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(body: RequestKnightCreateDto): Promise<Knight> {
    const weaponsKnights = body.weapons
      .filter(({ id }) => ObjectId.isValid(id))
      .map(({ isEquipped, id }) => ({
        isEquipped,
        id,
      }));
    if (
      weaponsKnights.length > 1 &&
      weaponsKnights.filter(({ isEquipped }) => isEquipped).length > 1
    ) {
      throw new BadRequestException(
        'Only one weapon can be equipped by a knight.',
      );
    }

    const weapons: Weapon[] = await this.prismaService.weapon.findMany({
      select: {
        id: true,
        name: true,
        mod: true,
        attr: true,
      },
      where: {
        id: {
          in: weaponsKnights.map(({ id }) => id),
        },
      },
    });

    if (!weapons.length) {
      throw new BadRequestException('Weapons invalid');
    }

    const knight = await this.prismaService.knight.findUnique({
      where: {
        nickname: body.nickName.toLowerCase(),
      },
    });

    if (knight) {
      throw new BadRequestException('Nickname already exists');
    }

    const weaponsFormatted = weapons.map(({ id, ...rest }) => {
      const weapon = weaponsKnights.find((weapon) => weapon.id === id);

      return {
        ...weapon,
        ...rest,
      };
    });

    const atribuitesDefault = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };

    const newKnight: Knight = await this.prismaService.knight.create({
      data: {
        name: body.name,
        nickname: body.nickName.toLocaleLowerCase(),
        birthday: body.birthday,
        keyAttribute: AttributeName[body.keyAttribute],
        weapons: weaponsFormatted,
        isHero: false,
        attributes: atribuitesDefault,
      },
    });

    return newKnight;
  }

  async findAll(filters?: string): Promise<IKnightFormatted[]> {
    const handlerFilters = {
      heroes: { isHero: true },
    };
    const knights: Knight[] = await this.prismaService.knight.findMany({
      where: handlerFilters[filters] || {},
    });

    const knightsFormatted: IKnightFormatted[] = knights.map((knight) =>
      this.formatteKnight(knight),
    );

    return knightsFormatted;
  }

  async findById(id: string): Promise<IKnightFormatted> {
    const knight: Knight = await this.prismaService.knight.findUnique({
      where: {
        id,
      },
    });

    if (!knight) {
      throw new BadRequestException('Knight not found');
    }

    return this.formatteKnight(knight);
  }

  async delete(id: string): Promise<Knight> {
    const knight: Knight = await this.prismaService.knight.findUnique({
      where: {
        id,
      },
    });

    if (!knight) {
      throw new BadRequestException('Knight not found');
    }

    const newKnight: Knight = await this.prismaService.knight.update({
      where: { id },
      data: {
        isHero: true,
      },
    });

    return newKnight;
  }

  async update(id: string, body: RequestKnightUpdateDto): Promise<Knight> {
    const knight: Knight = await this.prismaService.knight.findUnique({
      where: {
        id,
      },
    });

    if (!knight) {
      throw new BadRequestException('Knight not found');
    }

    const nickNameExits = await this.prismaService.knight.findUnique({
      where: {
        nickname: body.nickName.toLowerCase(),
      },
    });

    if (nickNameExits) {
      throw new BadRequestException('Nickname already exists');
    }

    const newKnight: Knight = await this.prismaService.knight.update({
      where: { id },
      data: {
        nickname: body.nickName.toLocaleLowerCase(),
      },
    });

    return newKnight;
  }

  private formatteKnight(knight: Knight): IKnightFormatted {
    const weapons = knight.weapons as Array<Weapon & { isEquipped: boolean }>;
    const weaponEquipped = weapons.find((weapon) => weapon.isEquipped);
    const attack = this.calculateAttack(
      knight.attributes[knight.keyAttribute],
      weaponEquipped.mod,
    );

    const experance = this.calculateExperance(knight.birthday);

    return {
      id: knight.id,
      name: knight.name,
      attribute: knight.keyAttribute,
      nickName: knight.nickname,
      weapons: weapons.length,
      birthday: this.calculateDifferenceYears(knight.birthday),
      attack,
      hero: knight.isHero,
      experance,
    };
  }

  private calculateAttack(valueAttr: number, mod: number) {
    const ranges = [
      {
        min: 0,
        max: 8,
        mod: -2,
      },
      {
        min: 9,
        max: 10,
        mod: -1,
      },
      {
        min: 11,
        max: 12,
        mod: 0,
      },
      {
        min: 13,
        max: 15,
        mod: 1,
      },
      {
        min: 16,
        max: 18,
        mod: 2,
      },
      {
        min: 19,
        max: 20,
        mod: -2,
      },
    ];

    const range = ranges.find(
      (item) => valueAttr >= item.min && valueAttr <= item.max,
    ).mod;

    return 10 + range + mod;
  }

  private calculateDifferenceYears(date: Date): number {
    const currentDate = new Date();
    return differenceInCalendarYears(currentDate, date);
  }
  private calculateExperance(birthdayKnight: Date): number {
    const differenceInYears = this.calculateDifferenceYears(birthdayKnight);

    return differenceInYears >= 7
      ? Math.floor((differenceInYears - 7) * Math.pow(22, 1.45))
      : 0;
  }
}
