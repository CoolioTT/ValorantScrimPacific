import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
  const scrims = await prisma.scrim.findMany({
    include: { teamA: true, teamB: true },
  })
  res.status(200).json(scrims)
}
