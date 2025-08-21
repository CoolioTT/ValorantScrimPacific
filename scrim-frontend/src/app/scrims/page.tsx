'use client';

import { useState } from 'react';
import ScrimCard from '@/components/ScrimCard';
import ScrimRequestModal from '@/components/ScrimRequestModal';

const mockScrims = [
  {
    team: 'Dead3ye E-Sports',
    time: '01:20 SGT',
    format: 'Bo2',
    region: 'SG',
    map: 'Any Map',
    avatar: '/avatars/dead3ye.png',
  },
  {
    team: 'Team Alpha',
    time: '02:00 SGT',
    format: 'Bo1',
    region: 'JP',
    map: 'Lotus',
    avatar: '/avatars/alpha.png',
  },
];

export default function ScrimsPage() {
  const [selectedScrim, setSelectedScrim] = useState<any>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Available Scrims</h1>
      {mockScrims.map((scrim, i) => (
        <ScrimCard key={i} scrim={scrim} onOpen={() => setSelectedScrim(scrim)} />
      ))}

      {selectedScrim && (
        <ScrimRequestModal
          scrim={selectedScrim}
          onClose={() => setSelectedScrim(null)}
        />
      )}
    </div>
  );
}
