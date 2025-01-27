import { AttributeName, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({});
async function main() {
  await prisma.weapon.create({
    data: {
      name: 'sword',
      mod: 10,
      attr: AttributeName.strength,
    },
  });
  await prisma.weapon.create({
     data: {
      name: 'hatchet',
      mod: 15,
      attr: AttributeName.strength,
    }
  })

  const weapon = await prisma.weapon.create({
     data: {
      name: 'ring',
      mod: 15,
      attr: AttributeName.strength,
    }
  })

  await prisma.knight.create({
    data: {
      nickname: 'green_lantern',
      name: 'Hal Jordan',
      birthday: new Date(1990, 10, 12),
      weapons: [
        { ...weapon, isEquipped: true }
      ],
      keyAttribute: AttributeName.intelligence,
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 12,
        wisdom: 0,
        charisma: 0
      },
      isHero: false
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })