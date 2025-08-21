import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const coolio = await prisma.user.create({
    data: {
      email: 'coolio@example.com',
      username: 'CoolioTT',
      discordId: '123456789',
      avatarUrl: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
      rank: 'Immortal',
    },
  })

  const jet = await prisma.user.create({
    data: {
      email: 'jet@example.com',
      username: 'JetMain',
      discordId: '987654321',
      avatarUrl: 'https://cdn.discordapp.com/avatars/987654321/avatar.png',
      rank: 'Diamond',
    },
  })

  const teamAlpha = await prisma.team.create({
    data: {
      name: 'Team Alpha',
      region: 'Asia',
      members: {
        create: [
          { userId: coolio.id, role: 'Captain' },
          { userId: jet.id, role: 'Player' },
        ],
      },
    },
  })

  const teamBravo = await prisma.team.create({
    data: {
      name: 'Team Bravo',
      region: 'Asia',
    },
  })

  const scrim = await prisma.scrim.create({
    data: {
      teamAId: teamAlpha.id,
      teamBId: teamBravo.id,
      scheduledAt: new Date(Date.now() + 3600 * 1000),
      status: 'pending',
    },
  })

  await prisma.invite.create({
    data: {
      senderId: coolio.id,
      receiverId: jet.id,
      teamId: teamAlpha.id,
      scrimId: scrim.id,
      type: 'scrim_invite',
      status: 'pending',
    },
  })
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
