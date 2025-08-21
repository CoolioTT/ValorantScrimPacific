import ScrimList from '@/components/ScrimList'
import InviteList from '@/components/InviteList'

export default function Home() {
  return (
    <main className="bg-black min-h-screen p-8">
      <ScrimList />
      <InviteList />
    </main>
  )
}
