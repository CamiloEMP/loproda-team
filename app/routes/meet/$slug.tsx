import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { PropsWithChildren } from 'react'
import { useEffect, useState, useRef } from 'react'
import { Navbar } from '~/components/navbar'
import type { meetSlugLoaderI } from '~/loader/meet.slug'
import { meetSlugLoader } from '~/loader/meet.slug'
import type { LocalVideoTrack, LocalAudioTrack } from 'twilio-video'
import { createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video'
import { isBrowser } from '~/util/isBrowser'

interface VideoParticipantProps {
  video: LocalVideoTrack
  audio: LocalAudioTrack
}

export const loader: LoaderFunction = meetSlugLoader

function rootMeanSquare(samples: Uint8Array) {
  const sumSq = samples.reduce((sumSq, sample) => sumSq + sample * sample, 0)
  return Math.sqrt(sumSq / samples.length)
}

async function analizeAudio(
  track: LocalAudioTrack,
  onLevelChanged: (a: number) => void
) {
  const audioContext = new AudioContext()
  await audioContext.resume()
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 1024
  analyser.smoothingTimeConstant = 0.5

  const stream = new MediaStream([track.mediaStreamTrack])
  const source = audioContext.createMediaStreamSource(stream)
  source.connect(analyser)

  const samples = new Uint8Array(analyser.frequencyBinCount)
  let level: number | null = null

  requestAnimationFrame(function checkLevel() {
    analyser.getByteFrequencyData(samples)
    const rms = rootMeanSquare(samples)
    const log2Rms = rms && Math.log2(rms)

    // Audio level ranges from 0 (silence) to 10 (loudest).
    const newLevel = Math.ceil((10 * log2Rms) / 8)
    if (level !== newLevel) {
      level = newLevel
      onLevelChanged(level)
    }

    // Continue calculating the level only if the audio track is live.
    if (track.mediaStreamTrack.readyState === 'live') {
      requestAnimationFrame(checkLevel)
    } else {
      requestAnimationFrame(() => onLevelChanged(0))
    }
  })
}

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

function Video({ video }: Omit<VideoParticipantProps, 'audio'>): JSX.Element {
  const localVideo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localVideo.current && video) {
      localVideo.current.innerHTML = ''
      localVideo.current.append(video.attach())
    }
  }, [video, localVideo])

  return <div ref={localVideo} className="absolute inset-0 z-0 video-rounded" />
}

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
  const [video, setVideo] = useState<LocalVideoTrack>()
  const [audio, setAudio] = useState<LocalAudioTrack>()

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
            video={video as LocalVideoTrack}
            audio={audio as LocalAudioTrack}
          />
        </div>
        <div aria-label="meet-action" className="w-full md:w-2/4">
          sd
        </div>
      </div>
    </div>
  )
}
