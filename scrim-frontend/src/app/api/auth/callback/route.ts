import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, fetchDiscordUser } from '@/lib/discord';
import { createSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });

  const tokenData = await exchangeCodeForToken(code);
  const userData = await fetchDiscordUser(tokenData.access_token);

  await prisma.user.upsert({
    where: { discordId: userData.id },
    update: {
      username: userData.username,
      avatar: userData.avatar,
    },
    create: {
      discordId: userData.id,
      username: userData.username,
      avatar: userData.avatar,
    },
  });

  const sessionCookie = await createSession(userData.id);

  return NextResponse.redirect(new URL('/dashboard', req.url), {
    headers: {
      'Set-Cookie': sessionCookie,
    },
  });
}
