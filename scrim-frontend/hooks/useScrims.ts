import { useEffect, useState } from 'react'

export function useScrims() {
  const [scrims, setScrims] = useState([])

  useEffect(() => {
    fetch('/api/scrims')
      .then(res => res.json())
      .then(setScrims)
  }, [])

  return scrims
}

