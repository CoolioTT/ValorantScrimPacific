'use client';

export default function TeamsPage() {
  const mockTeams = [
    { name: 'Chiz Borger Academy', rank: 'Immortal 2', region: 'SG' },
    { name: 'Dead3ye E-Sports', rank: 'Diamond 3', region: 'JP' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Your Teams</h1>
      <ul className="space-y-4">
        {mockTeams.map((team, i) => (
          <li key={i} className="bg-surface p-4 rounded-card shadow">
            <h2 className="text-lg font-semibold text-white">{team.name}</h2>
            <p className="text-sm text-muted">{team.rank} • {team.region}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
