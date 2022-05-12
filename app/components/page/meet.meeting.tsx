import { MeetNavbar } from './meet/navbar.meet'
import classname from 'classnames'
import { Video } from '../media/video.component'
import { useEffect, useState } from 'react'
import type { VideoParticipantProps } from '../media/types'
import { isBrowser } from '~/util/isBrowser'
import { createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video'
import { AudioDisplay } from '../media/audio.component'
import { useVideoProvider } from '~/provider/video'

interface MeetParticipantProps extends Partial<VideoParticipantProps> {
  owner?: boolean
  focus?: boolean
  name?: string
}

function MeetParticipant({
  owner,
  focus,
  name,
  video,
  audio
}: MeetParticipantProps): JSX.Element {
  return (
    <div
      className={classname('bg-black border border-gray-700 rounded-lg', {
        'w-full h-full': !owner,
        'absolute bottom-4 right-4 w-64 h-fit z-10': owner
      })}
    >
      <div className="relative h-full w-auto flex items-center">
        {focus ? (
          video && <Video video={video} />
        ) : (
          <div className="aspect-video">{video && <Video video={video} />}</div>
        )}
        <div className="absolute top-2 right-2">
          {audio && <AudioDisplay audio={audio} />}
        </div>
        {name && !owner && (
          <span className="absolute bottom-2 left-2 select-none text-gray-400">
            {name}
          </span>
        )}
      </div>
    </div>
  )
}

export function MeetInMetting(): JSX.Element {
  const { audioLocal, videoLocal, mediaLocal } = useVideoProvider()
  const [participants] = useState(10)
  console.log(mediaLocal)
  return (
    <main className="w-full h-full bg-gray-800 p-4 dark flex flex-col gap-4">
      <div className="flex-1 min-h-0 grid grid-cols-6 grid-rows-6 gap-2 relative">
        <div className="col-span-5 row-span-6 relative">
          <MeetParticipant name="unicornio focus" focus />
          <MeetParticipant
            name="unicornio focus"
            audio={audioLocal}
            video={videoLocal}
            focus
            owner
          />
        </div>
        <div className="col-span-1 row-span-6 flex flex-col gap-4 overflow-auto rounded-lg">
          {Array.from({ length: participants }).map((_, i) => (
            <MeetParticipant name="unicornio" key={`meet-participant-${i}`} />
          ))}
        </div>
      </div>
      <MeetNavbar />
    </main>
  )
}
