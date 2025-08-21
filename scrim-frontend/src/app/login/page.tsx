'use client';

export default function LoginPage() {
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}&response_type=code&scope=identify`;

  return (
    <div>
      <h1>Login</h1>
      <a href={discordAuthUrl}>Login with Discord</a>
    </div>
  );
}
