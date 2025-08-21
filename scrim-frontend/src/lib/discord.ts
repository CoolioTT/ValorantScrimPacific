export async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams();
  params.append('client_id', process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
  params.append('client_secret', process.env.DISCORD_CLIENT_SECRET!);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!);
  params.append('scope', 'identify');

  const res = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  return res.json();
}

export async function fetchDiscordUser(accessToken: string) {
  const res = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.json();
}
