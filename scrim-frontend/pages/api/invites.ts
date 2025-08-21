import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
  const invites = await prisma.invite.findMany({
    include: {
      sender: true,
      receiver: true,
      team: true,
      scrim: true,
    },
  })
  res.status(200).json(invites)
}
