import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Navbar } from '~/components/navbar'
import { AudioDisplay } from '~/components/media/audio.component'
import { Video } from '~/components/media/video.component'
import type { VideoParticipantProps } from '~/components/media/types'
import type { meetSlugLoaderI } from '~/loader/meet.slug'
import { meetSlugLoader } from '~/loader/meet.slug'
import { createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video'
import { isBrowser } from '~/util/isBrowser'

export const loader: LoaderFunction = meetSlugLoader

function VideoParticipant({
  children,
  audio,
  video
}: PropsWithChildren<VideoParticipantProps>): JSX.Element {
  return (
    <div className="ralative w-full h-auto bg-black rounded-lg shadow">
      <div className="relative [padding-top:56.25%]">
        {video && <Video video={video} />}
        <div className="absolute z-10 inset-0 flex flex-col justify-between items-center p-3">
          {audio && <AudioDisplay audio={audio} />}
          {children}
        </div>
      </div>
    </div>
  )
}

export default function MeetSlug(): JSX.Element {
  const loader = useLoaderData<meetSlugLoaderI>()
  const [video, setVideo] = useState<VideoParticipantProps['video']>()
  const [audio, setAudio] = useState<VideoParticipantProps['audio']>()

  useEffect(() => {
    if (isBrowser()) {
      createLocalVideoTrack().then(v => setVideo(v))
      createLocalAudioTrack().then(a => setAudio(a))
    }
  }, [])
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <div className="flex-1 flex flex-col items-center gap-4 px-4 pt-4 md:flex-row md:pt-0">
        <div aria-label="video-preview" className="w-full md:w-2/4">
          <VideoParticipant
            video={video as VideoParticipantProps['video']}
            audio={audio as VideoParticipantProps['audio']}
          />
        </div>
        <div aria-label="meet-action" className="w-full md:w-2/4">
          sd
        </div>
      </div>
    </div>
  )
}
