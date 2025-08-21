// pages/api/scrims.ts
import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  const scrims = await prisma.scrim.findMany({
    include: {
      teamA: true,
      teamB: true,
      invites: true,
    },
    orderBy: { scheduledAt: "desc" },
  })

  res.json(scrims)
}
