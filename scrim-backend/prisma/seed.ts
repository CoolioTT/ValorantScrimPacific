import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const team = await prisma.team.create({
    data: {
      name: "Valorant Legends",
      tag: "VLT",
      region: "Asia",
      rank: "Immortal",
      discordTag: "VLT#1234",
      isPublic: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "player@vlt.gg",
      username: "AceHunter",
      password: "hashed_pw",
      team: { connect: { id: team.id } },
    },
  });

  await prisma.scrim.create({
    data: {
      hostId: user.id,
    },
  });

  await prisma.review.create({
    data: {
      reviewerId: user.id,
      teamId: team.id,
      rating: 5,
      comment: "Great coordination!",
    },
  });
}

main().finally(() => prisma.$disconnect());
