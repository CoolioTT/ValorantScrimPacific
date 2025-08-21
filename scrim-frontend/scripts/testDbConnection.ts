import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(`✅ Connected to DB. Found ${users.length} users.`);
}

main()
  .catch((e) => {
    console.error('❌ DB connection failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
