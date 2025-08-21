import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/scrims — list all scrims
router.get('/', async (req, res) => {
  try {
    const scrims = await prisma.scrim.findMany();
    res.json(scrims);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch scrims');
  }
});

// POST /api/scrims — create a new scrim
router.post('/', async (req, res) => {
  const { teamAId, teamBId, scheduledAt } = req.body;
  try {
    const newScrim = await prisma.scrim.create({
      data: {
        teamAId,
        teamBId,
        scheduledAt: new Date(scheduledAt),
      },
    });
    res.status(201).json(newScrim);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create scrim');
  }
});

// DELETE /api/scrims/:id — delete a scrim
router.delete('/:id', async (req, res) => {
  const scrimId = req.params.id;
  try {
    await prisma.scrim.delete({ where: { id: scrimId } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete scrim');
  }
});

export default router;
