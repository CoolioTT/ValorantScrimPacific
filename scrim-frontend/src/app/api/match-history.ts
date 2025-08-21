export default async function handler(req, res) {
  const matches = await prisma.scrim.findMany({
    where: { status: "COMPLETED" },
    include: { teamA: true, teamB: true },
    orderBy: { scheduledAt: "desc" },
  })

  res.json(matches)
}
