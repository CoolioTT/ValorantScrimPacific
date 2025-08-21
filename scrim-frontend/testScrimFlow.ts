import { prisma } from "@/lib/prisma"
import { sendDiscordMessage } from "@/lib/discordBot"

async function run() {
  const teamA = await prisma.team.create({
    data: {
      name: "Team Alpha",
      avatarUrl: "https://cdn.discordapp.com/avatars/1234567890/avatar.png",
      rank: "Immortal",
      discordId: "1234567890",
      discordChannelId: "YOUR_CHANNEL_ID_A",
    },
  })

  const teamB = await prisma.team.create({
    data: {
      name: "Team Bravo",
      avatarUrl: "https://cdn.discordapp.com/avatars/0987654321/avatar.png",
      rank: "Ascendant",
      discordId: "0987654321",
      discordChannelId: "YOUR_CHANNEL_ID_B",
    },
  })

  const scrim = await prisma.scrim.create({
    data: {
      scheduledAt: new Date(Date.now() + 3600000),
      status: "PENDING",
      teamAId: teamA.id,
      teamBId: teamB.id,
    },
  })

  const invite = await prisma.invite.create({
    data: {
      scrimId: scrim.id,
      userId: "coolio_user_id",
      status: "PENDING",
    },
  })

  // Accept the invite and trigger bot
  await prisma.invite.update({
    where: { id: invite.id },
    data: { status: "ACCEPTED" },
  })

  await sendDiscordMessage({
    channelId: teamA.discordChannelId,
    content: `✅ Scrim accepted by CoolioTT! Match confirmed vs ${teamB.name}`,
  })

  await sendDiscordMessage({
    channelId: teamB.discordChannelId,
    content: `✅ Scrim accepted! Get ready to face ${teamA.name}`,
  })

  console.log("✅ Scrim flow completed.")
}

run().catch((err) => {
  console.error("❌ Error in scrim flow:", err)
})
