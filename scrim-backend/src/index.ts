import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';

import './auth/auth';
import authRoutes from './routes/authRoutes';
import matchesRouter from './routes/matches';
import scrimRoutes from './routes/scrimRoutes';
import teamRoutes from './routes/teamRoutes';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET!, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/scrims', scrimRoutes);
app.use('/api/teams', teamRoutes);
app.use('/matches', matchesRouter);

app.get('/', (req, res) => res.send('✅ Scrim backend is running'));
app.get('/ping-db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send('✅ Database is alive');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Database error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
