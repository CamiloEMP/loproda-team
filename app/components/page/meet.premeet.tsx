import { CameraIcon, CogIcon, MicrophoneIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video'
import type { meetSlugLoaderI } from '~/loader/meet.slug'
import { isBrowser } from '~/util/isBrowser'
import type { VideoParticipantProps } from '../media/types'
import { VideoParticipant } from '../media/video.component'
import { Navbar } from '../navbar'
import { BoxLogo, JoinRoom } from './meet/message'

interface MeetPreMeetProps {
  loader: meetSlugLoaderI
}

export function MeetPreMeet({ loader }: MeetPreMeetProps): JSX.Element {
  const { name, avatar, username } = loader

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
      {loader?.auth ? <Navbar user={{ name, avatar, username }} /> : <Navbar />}
      <div className="relative flex-1 flex flex-col items-center gap-4 px-4 pt-4 md:flex-row md:pt-0">
        <div aria-label="video-preview" className="w-full md:w-2/4">
          <VideoParticipant
            video={video as VideoParticipantProps['video']}
            audio={audio as VideoParticipantProps['audio']}
          >
            <div className="absolute bottom-2 flex justify-center gap-4 z-50">
              <BoxLogo>
                <CameraIcon className="w-8 h-8 p-1 sm:w-12 sm:h-12 sm:p-2 text-white" />
              </BoxLogo>
              <BoxLogo>
                <MicrophoneIcon className="w-8 h-8 p-1 sm:w-12 sm:h-12 sm:p-2 text-white" />
              </BoxLogo>
              <BoxLogo>
                <CogIcon className="w-8 h-8 p-1 sm:w-12 sm:h-12 sm:p-2 text-white" />
              </BoxLogo>
            </div>
          </VideoParticipant>
        </div>
        <div
          aria-label="meet-action"
          className="w-full md:w-2/4 flex flex-col items-center gap-4 p-4"
        >
          <JoinRoom {...loader} />
        </div>
      </div>
    </div>
  )
}
