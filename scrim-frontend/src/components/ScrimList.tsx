import { useScrims } from '@/hooks/useScrims'

export default function ScrimList() {
  const scrims = useScrims()

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-2">Upcoming Scrims</h2>
      {scrims.map(scrim => (
        <div key={scrim.id} className="text-white">
          {scrim.teamA.name} vs {scrim.teamB.name} @ {new Date(scrim.scheduledAt).toLocaleString()}
        </div>
      ))}
    </div>
  )
}
