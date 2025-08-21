import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const teams = await prisma.team.findMany({
    include: { players: true },
  });

  return NextResponse.json(teams);
}
