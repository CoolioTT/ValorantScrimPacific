'use client';

export default function ProfilePage() {
  const user = {
    name: 'CoolioTT',
    rank: 'Ascendant 1',
    role: 'IGL',
    region: 'TH',
    avatar: '/avatars/user.png',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Your Profile</h1>
      <div className="bg-surface p-6 rounded-card shadow flex items-center gap-6">
        <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold text-white">{user.name}</h2>
          <p className="text-sm text-muted">{user.rank} • {user.role} • {user.region}</p>
        </div>
      </div>
    </div>
  );
}
