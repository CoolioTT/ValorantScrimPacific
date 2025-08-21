import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const teamA = await prisma.team.create({
    data: {
      name: 'Valorant Titans',
      region: 'Asia-Pacific',
      players: {
        create: [
          { name: 'Jetstream', discordId: '1234567890' },
          { name: 'PhantomX', discordId: '2345678901' },
        ],
      },
    },
  });

  const teamB = await prisma.team.create({
    data: {
      name: 'Spike Masters',
      region: 'Asia-Pacific',
      players: {
        create: [
          { name: 'ViperQueen', discordId: '3456789012' },
          { name: 'SageSoul', discordId: '4567890123' },
        ],
      },
    },
  });

  await prisma.match.create({
    data: {
      teamAId: teamA.id,
      teamBId: teamB.id,
      scheduledAt: new Date(Date.now() + 3600 * 1000),
      status: 'SCHEDULED',
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
