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