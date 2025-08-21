// pages/api/scrim/accept.ts
import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  const { inviteId } = req.body

  const invite = await prisma.invite.update({
    where: { id: inviteId },
    data: { status: "ACCEPTED" },
    include: {
      scrim: {
        include: {
          teamA: true,
          teamB: true,
        },
      },
    },
  })

  res.status(200).json({ success: true })
}
