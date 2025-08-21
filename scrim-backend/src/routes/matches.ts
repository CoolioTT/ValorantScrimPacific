import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const matches = await prisma.match.findMany({
    include: {
      teamA: true,
      teamB: true,
    },
  });
  res.json(matches);
});

router.post('/', async (req, res) => {
  const { teamAId, teamBId, scheduledAt } = req.body;
  const match = await prisma.match.create({
    data: {
      teamAId,
      teamBId,
      scheduledAt: new Date(scheduledAt),
      status: 'SCHEDULED',
    },
  });
  res.json(match);
});

export default router;
