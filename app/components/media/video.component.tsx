import { useEffect, useRef } from 'react'
import type { VideoParticipantProps } from './types'

export function Video({
  video
}: Omit<VideoParticipantProps, 'audio'>): JSX.Element {
  const localVideo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localVideo.current && video) {
      localVideo.current.innerHTML = ''
      localVideo.current.append(video.attach())
    }
  }, [video, localVideo])

  return <div ref={localVideo} className="absolute inset-0 z-0 video-rounded" />
}
