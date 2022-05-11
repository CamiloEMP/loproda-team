import type { VideoParticipantProps } from './types'
import { useState, useEffect } from 'react'
import { analizeAudio } from './audio.analyze'

export function AudioDisplay({
  audio
}: Omit<VideoParticipantProps, 'video'>): JSX.Element {
  const [vMax, setVMax] = useState(0)
  const [vMin, setVMin] = useState(0)

  useEffect(() => {
    analizeAudio(audio, v => {
      setVMax(v >= 2 ? v : 3)
      setVMin(v >= 2 ? (v <= 5 ? v : 5) : 3)
    })
  }, [audio])

  return (
    <div className="w-7 h-7 self-end bg-blue-500 rounded-full flex gap-1 justify-center items-center py-1.5">
      <div
        className="w-1 bg-white rounded-lg"
        style={{ height: vMin + '5%' }}
      />
      <div
        className="w-1 bg-white rounded-lg"
        style={{ height: vMax + '5%' }}
      />
      <div
        className="w-1 bg-white rounded-lg"
        style={{ height: vMin + '5%' }}
      />
    </div>
  )
}
