export default function MatchHistory({ matches }: { matches: Scrim[] }) {
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="bg-zinc-900 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={match.teamA.avatarUrl}
                alt={match.teamA.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-bold">{match.teamA.name}</div>
                <div className="text-sm text-zinc-400">Rank: {match.teamA.rank}</div>
                <a
                  href={`https://discord.com/users/${match.teamA.discordId}`}
                  target="_blank"
                  className="text-xs text-blue-400 underline"
                >
                  Discord Profile
                </a>
              </div>
            </div>

            <span className="text-zinc-300 font-semibold">vs</span>

            <div className="flex items-center gap-4">
              <img
                src={match.teamB.avatarUrl}
                alt={match.teamB.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-bold">{match.teamB.name}</div>
                <div className="text-sm text-zinc-400">Rank: {match.teamB.rank}</div>
                <a
                  href={`https://discord.com/users/${match.teamB.discordId}`}
                  target="_blank"
                  className="text-xs text-blue-400 underline"
                >
                  Discord Profile
                </a>
              </div>
            </div>
          </div>

          <div className="mt-2 text-sm text-zinc-300">
            Scheduled: {new Date(match.scheduledAt).toLocaleString()}
          </div>
          <div className="text-sm text-zinc-400">Status: {match.status}</div>
        </div>
      ))}
    </div>
  )
}
