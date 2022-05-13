import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'
import { AudioDisplay } from './audio.component'
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

  return <div ref={localVideo} className="video-rounded" />
}

export function VideoParticipant({
  children,
  audio,
  video
}: PropsWithChildren<Partial<VideoParticipantProps>>): JSX.Element {
  return (
    <div className="ralative w-full h-auto bg-black rounded-lg shadow max-h-full overflow-hidden">
      <div className="relative h-full w-auto">
        {video && <Video video={video} />}
        <div className="absolute z-10 inset-0 flex flex-col justify-between items-center p-3">
          {audio && <AudioDisplay audio={audio} />}
          {children}
        </div>
      </div>
    </div>
  )
}
