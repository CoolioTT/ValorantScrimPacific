import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/teams — list all teams
router.get('/', async (req, res) => {
  try {
    const teams = await prisma.team.findMany();
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch teams');
  }
});

// GET /api/teams/:id — get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
    });
    if (!team) return res.status(404).send('Team not found');
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching team');
  }
});

// POST /api/teams — create a new team
router.post('/', async (req, res) => {
  const { name, tag } = req.body;
  try {
    const newTeam = await prisma.team.create({
      data: { name, tag },
    });
    res.status(201).json(newTeam);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create team');
  }
});

// DELETE /api/teams/:id — delete a team
router.delete('/:id', async (req, res) => {
  try {
    await prisma.team.delete({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete team');
  }
});

export default router;
