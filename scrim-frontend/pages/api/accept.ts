import { PrismaClient } from "@prisma/client"
import { sendDiscordMessage } from "@/lib/discordBot"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { inviteId, userId } = req.body

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

  await sendDiscordMessage({
    channelId: invite.scrim.teamA.discordChannelId,
    content: `✅ Scrim accepted by ${userId}! Match confirmed vs ${invite.scrim.teamB.name}`,
  })

  await sendDiscordMessage({
    channelId: invite.scrim.teamB.discordChannelId,
    content: `✅ Scrim accepted! Get ready to face ${invite.scrim.teamA.name}`,
  })

  res.status(200).json({ success: true })
}
