import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
  }
];


export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  const ingredientData = await prisma.ingredients.createMany({
    data: [
      { name: 'milk', barcode: 2234723274 },
      { name: 'egg', barcode: 237923374 },
    ]
});
}

main()