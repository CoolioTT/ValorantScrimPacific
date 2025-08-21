import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const scrims = await prisma.scrim.findMany({
    include: { team: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(scrims);
}
