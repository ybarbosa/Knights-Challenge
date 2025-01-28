import { Test, TestingModule } from '@nestjs/testing';
import { KnightsService } from './knights.service';
import { PrismaService } from '../prisma/prisma.service';
import { RequestKnightCreateDto } from './dto/create.dto';
import { ObjectId } from 'mongodb';
import { Knight } from '@prisma/client';

const weaponMock = {
  findMany: jest.fn(),
};
const knightMock = {
  findMany: jest.fn(),
  findUnique: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
const mockObjectId = () => new ObjectId().toString();
const knightUnFormattedData = {
  id: mockObjectId(),
} as Knight;
describe('KnightService', () => {
  let sut: KnightsService;
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsService,
        {
          provide: PrismaService,
          useValue: {
            knight: knightMock,
            weapon: weaponMock,
          },
        },
      ],
    }).compile();

    sut = module.get<KnightsService>(KnightsService);
  });

  describe('.create', () => {
    describe('When weapons not exits', () => {
      it('Should return an error', async () => {
        const payload: RequestKnightCreateDto = {
          weapons: [
            {
              id: 'any-test',
              isEquipped: false,
            },
          ],
          nickName: 'nickname',
          name: 'name',
          birthday: new Date(),
          keyAttribute: 'strength',
        };
        weaponMock.findMany.mockResolvedValue([]);
        try {
          await sut.create(payload);
        } catch (error) {
          expect(error.message).toBe('Weapons invalid');
          expect(knightMock.create).not.toHaveBeenCalled();
        }
      });
    });

    describe('When more than one weapon is equipped', () => {
      it('Should return an error', async () => {
        const payload: RequestKnightCreateDto = {
          weapons: [
            {
              id: mockObjectId(),
              isEquipped: true,
            },
            {
              id: mockObjectId(),
              isEquipped: true,
            },
          ],
          nickName: 'nickname',
          name: 'name',
          birthday: new Date(),
          keyAttribute: 'strength',
        };
        try {
          await sut.create(payload);
        } catch (error) {
          expect(error.message).toBe(
            'Only one weapon can be equipped by a knight.',
          );
          expect(knightMock.create).not.toHaveBeenCalled();
        }
      });
    });

    describe('When nickName exist', () => {
      it('Should return an error', async () => {
        const payload: RequestKnightCreateDto = {
          weapons: [
            {
              id: mockObjectId(),
              isEquipped: true,
            },
          ],
          nickName: 'nickname',
          name: 'name',
          birthday: new Date(),
          keyAttribute: 'strength',
        };
        knightMock.findUnique.mockResolvedValue(knightUnFormattedData);
        weaponMock.findMany.mockResolvedValue([{ id: mockObjectId() }]);
        try {
          await sut.create(payload);
        } catch (error) {
          expect(error.message).toBe('Nickname already exists');
          expect(knightMock.create).not.toHaveBeenCalled();
        }
      });
    });

    describe('When payload is valid', () => {
      it('Should create an knight', async () => {
        const birthday = new Date();
        const wepon = {
          id: mockObjectId(),
          isEquipped: true,
        };
        const payload: RequestKnightCreateDto = {
          weapons: [wepon],
          nickName: 'nickname',
          name: 'name',
          birthday,
          keyAttribute: 'strength',
        };
        knightMock.findUnique.mockResolvedValue(null);
        weaponMock.findMany.mockResolvedValue([wepon]);
        knightMock.create.mockResolvedValue({
          id: mockObjectId(),
        });
        await sut.create(payload);

        expect(knightMock.create).toHaveBeenCalled();
        expect(knightMock.create).toHaveBeenCalledWith({
          data: {
            name: 'name',
            nickname: 'nickname',
            keyAttribute: 'strength',
            birthday,
            isHero: false,
            weapons: [
              {
                id: wepon.id,
                isEquipped: true,
              },
            ],
            attributes: {
              strength: 0,
              dexterity: 0,
              constitution: 0,
              intelligence: 0,
              wisdom: 0,
              charisma: 0,
            },
          },
        });
      });
    });
  });

  describe('.findAll', () => {
    let formatteKnightSpy: jest.SpyInstance;
    beforeAll(() => {
      formatteKnightSpy = jest
        .spyOn(sut as any, 'formatteKnight')
        .mockResolvedValue([{ id: mockObjectId() }]);
    });
    afterAll(() => {
      formatteKnightSpy.mockRestore();
      formatteKnightSpy.mockReset();
    });
    describe('When have filter', () => {
      it('Should find all knights filter by heroes', async () => {
        knightMock.findMany.mockResolvedValue([{ id: mockObjectId() }]);
        await sut.findAll('heroes');
        expect(knightMock.findMany).toHaveBeenCalled();
        expect(knightMock.findMany).toHaveBeenCalledWith({
          where: {
            isHero: true,
          },
        });
      });
    });
    describe('When not have filter', () => {
      it('Should find all knights', async () => {
        knightMock.findMany.mockResolvedValue([{ id: mockObjectId() }]);
        await sut.findAll();
        expect(knightMock.findMany).toHaveBeenCalled();
        expect(knightMock.findMany).toHaveBeenCalledWith({
          where: {},
        });
      });
    });
  });

  describe('.findById', () => {
    let formatteKnightSpy: jest.SpyInstance;
    beforeAll(() => {
      formatteKnightSpy = jest
        .spyOn(sut as any, 'formatteKnight')
        .mockResolvedValue([{ id: mockObjectId() }]);
    });
    afterAll(() => {
      formatteKnightSpy.mockRestore();
      formatteKnightSpy.mockReset();
    });
    describe('When knight not exists', () => {
      it('Should return an error', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique.mockReturnValue(null);
        try {
          await sut.findById(idFake);
        } catch (error) {
          expect(knightMock.findUnique).toHaveBeenCalledWith({
            where: {
              id: idFake,
            },
          });
          expect(error.message).toEqual('Knight not found');
        }
      });
    });

    describe('When knight exists', () => {
      it('Should find an knight', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique.mockReturnValue({ id: idFake });

        await sut.findById(idFake);
        expect(knightMock.findUnique).toHaveBeenCalledWith({
          where: {
            id: idFake,
          },
        });
      });
    });
  });

  describe('.delete', () => {
    describe('When knight not exists', () => {
      it('Should return an error', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique.mockReturnValue(null);
        try {
          await sut.delete(idFake);
        } catch (error) {
          expect(knightMock.findUnique).toHaveBeenCalledWith({
            where: {
              id: idFake,
            },
          });
          expect(error.message).toEqual('Knight not found');
          expect(knightMock.update).not.toHaveBeenCalled();
        }
      });
    });
    describe('When knight exists', () => {
      it('Should deleted an knight', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique.mockReturnValue({ id: idFake });
        await sut.delete(idFake);
        expect(knightMock.findUnique).toHaveBeenCalledWith({
          where: {
            id: idFake,
          },
        });
        expect(knightMock.update).toHaveBeenCalled();
        expect(knightMock.update).toHaveBeenCalledWith({
          where: {
            id: idFake,
          },
          data: {
            isHero: true,
          },
        });
      });
    });
  });

  describe('.update', () => {
    describe('When knight not exists', () => {
      it('Should return an error', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique.mockReturnValue(null);
        try {
          await sut.update(idFake, {
            nickName: 'test',
          });
        } catch (error) {
          expect(knightMock.findUnique).toHaveBeenCalledWith({
            where: {
              id: idFake,
            },
          });
          expect(error.message).toEqual('Knight not found');
          expect(knightMock.update).not.toHaveBeenCalled();
        }
      });
    });
    describe('When nickName exists', () => {
      it('Should return an error', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique.mockImplementation(() => ({ id: idFake }));
        try {
          await sut.update(idFake, {
            nickName: 'test',
          });
        } catch (error) {
          expect(knightMock.findUnique).toHaveBeenLastCalledWith({
            where: {
              nickname: 'test',
            },
          });
          expect(error.message).toEqual('Nickname already exists');
          expect(knightMock.update).not.toHaveBeenCalled();
        }
      });
    });

    describe('When payload is valid', () => {
      it('Should update an knight', async () => {
        const idFake = mockObjectId();
        knightMock.findUnique
          .mockImplementationOnce(() => ({ id: idFake }))
          .mockImplementationOnce(() => null);

        await sut.update(idFake, {
          nickName: 'TEST',
        });
        expect(knightMock.findUnique).toHaveBeenCalledWith({
          where: {
            id: idFake,
          },
        });
        expect(knightMock.update).toHaveBeenCalled();
        expect(knightMock.update).toHaveBeenCalledWith({
          where: {
            id: idFake,
          },
          data: {
            nickname: 'test',
          },
        });
      });
    });
  });
  describe('.calculateAttack', () => {
    it('Should calculate attack', () => {
      const attack = sut['calculateAttack'](2, 3);
      expect(attack).toBe(11);
    });
  });
  describe('.calculateExperance', () => {
    describe('When birthday minor 7', () => {
      it('Should return 0.', () => {
        const birthday = new Date(2020, 1, 20);
        const attack = sut['calculateExperance'](birthday);
        expect(attack).toBe(0);
      });
    });

    describe('When birthday is equal or major 7', () => {
      it('Should return a value different from zero', () => {
        const birthday = new Date(2010, 1, 20);
        const attack = sut['calculateExperance'](birthday);
        expect(attack).not.toEqual(0);
      });
    });
  });

  describe('.formatteKnight', () => {
    it('Should formatted knight', () => {
      const knight = {
        id: mockObjectId(),
        name: 'name',
        nickname: 'nickname',
        weapons: [
          {
            id: mockObjectId(),
            isEquipped: true,
            mod: 10,
          },
        ],
        birthday: new Date(1997, 1, 24),
        keyAttribute: 'strength',
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        isHero: false,
      };
      const knightFormatted = sut['formatteKnight'](knight);
      expect(knightFormatted).toEqual({
        id: knight.id,
        name: knight.name,
        nickName: knight.nickname,
        attribute: 'strength',
        weapons: 1,
        birthday: 28,
        attack: 18,
        hero: false,
        experance: 1856,
      });
    });
  });
});
