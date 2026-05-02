import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create an Admin
  const admin = await prisma.user.upsert({
    where: { code: "ADMIN999" },
    update: {},
    create: {
      name: "Super Admin",
      role: Role.ADMIN,
      code: "ADMIN999",
    },
  });

  // Create a Forest Ranger
  const ranger = await prisma.user.upsert({
    where: { code: "RANGER123" },
    update: {},
    create: {
      name: "Polisi Hutan 1",
      role: Role.FOREST_RANGER,
      code: "RANGER123",
    },
  });

  // Create a Construction Worker
  const worker = await prisma.user.upsert({
    where: { code: "WORKER456" },
    update: {},
    create: {
      name: "Pekerja Konstruksi 1",
      role: Role.CONSTRUCTION_WORKER,
      code: "WORKER456",
    },
  });

  console.log({ ranger, worker });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
