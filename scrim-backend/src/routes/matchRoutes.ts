import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/matches — list all matches
router.get('/', async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      include: {
        teamA: true,
        teamB: true,
      },
    });
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch matches');
  }
});

// GET /api/matches/:id — get match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        teamA: true,
        teamB: true,
      },
    });
    if (!match) return res.status(404).send('Match not found');
    res.json(match);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching match');
  }
});

// POST /api/matches — create a new match
router.post('/', async (req, res) => {
  const { teamAId, teamBId, scheduled } = req.body;
  try {
    const newMatch = await prisma.match.create({
      data: {
        teamAId,
        teamBId,
        scheduled: new Date(scheduled),
      },
    });
    res.status(201).json(newMatch);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create match');
  }
});

// DELETE /api/matches/:id — delete a match
router.delete('/:id', async (req, res) => {
  try {
    await prisma.match.delete({ where: { id: parseInt(req.params.id) } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete match');
  }
});

export default router;
