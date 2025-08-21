import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const scrim = await prisma.scrimRequest.create({
    data: {
      teamId: body.teamId,
      opponentId: body.opponentId,
      format: body.format,
      map: body.map,
      region: body.region,
      message: body.message || '',
    },
  });

  return NextResponse.json(scrim);
}
