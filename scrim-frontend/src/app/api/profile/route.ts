import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const user = await prisma.user.findUnique({
    where: { id: 'user-id-placeholder' }, // Replace with session logic
    include: { teams: true },
  });

  return NextResponse.json(user);
}
