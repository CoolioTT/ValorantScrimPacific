import { useInvites } from '@/hooks/useInvites'

export default function InviteList() {
  const invites = useInvites()

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-2">Pending Invites</h2>
      {invites.map(invite => (
        <div key={invite.id} className="text-white">
          {invite.sender.username} invited {invite.receiver.username} to {invite.team?.name || 'scrim'} ({invite.type})
        </div>
      ))}
    </div>
  )
}
