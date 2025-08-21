import useSWR from "swr"
import { useState } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminDashboard() {
  const { data: scrims } = useSWR("/api/scrims", fetcher)
  const [loading, setLoading] = useState(false)

  const acceptInvite = async (inviteId: string) => {
    setLoading(true)
    await fetch("/api/scrim/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteId, userId: "coolio_user_id" }),
    })
    setLoading(false)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Scrim Dashboard</h1>
      {scrims?.map((scrim) => (
        <div key={scrim.id} className="bg-zinc-800 p-4 rounded-lg">
          <div className="font-semibold">
            {scrim.teamA.name} vs {scrim.teamB.name}
          </div>
          <div className="text-sm text-zinc-400">
            Scheduled: {new Date(scrim.scheduledAt).toLocaleString()}
          </div>
          {scrim.invites.map((invite) => (
            <button
              key={invite.id}
              onClick={() => acceptInvite(invite.id)}
              disabled={loading}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Accept Invite for {invite.userId}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
