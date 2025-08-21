import { useEffect, useState } from 'react'

export function useInvites() {
  const [invites, setInvites] = useState([])

  useEffect(() => {
    fetch('/api/invites')
      .then(res => res.json())
      .then(setInvites)
  }, [])

  return invites
}
