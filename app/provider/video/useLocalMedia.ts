import { useEffect, useState } from 'react'
import type { LocalAudioTrack, LocalVideoTrack } from 'twilio-video'
import { createLocalAudioTrack, createLocalVideoTrack } from 'twilio-video'
import { isBrowser } from '~/util/isBrowser'
import type { MediaInfo, useMediaLocalR } from '../types/video.types'

async function getAllMediaTrack() {
  const media = await navigator.mediaDevices.enumerateDevices()
  return {
    video: media.filter(x => x.kind === 'videoinput'),
    audio: media.filter(x => x.kind === 'audioinput'),
    output: media.filter(x => x.kind === 'audiooutput')
  }
}

interface setMediaLocalI {
  media: InputDeviceInfo
}

export function useMediaLocal(): useMediaLocalR {
  const [video, setVideo] = useState<LocalVideoTrack>()
  const [audio, setAudio] = useState<LocalAudioTrack>()
  const [output] = useState<LocalAudioTrack>()
  const [media, setMedia] = useState<MediaInfo>()

  async function setMediaLocal({ media }: setMediaLocalI) {
    if (media.kind === 'audioinput') {
      const d = await createLocalAudioTrack(media)
      setAudio(d)
      localStorage.setItem('media.mic', media.deviceId)
    }

    if (media.kind === 'videoinput') {
      const d = await createLocalVideoTrack(media)
      setVideo(d)
      localStorage.setItem('media.cam', media.deviceId)
    }
  }

  useEffect(() => {
    if (isBrowser()) {
      getAllMediaTrack().then(d => {
        setMedia(d)
        const cam = localStorage.getItem('media.cam') || ''
        const mic = localStorage.getItem('media.mic') || ''

        const audioD =
          d.audio.find(x => x.deviceId === mic) ||
          d.audio.find(x => x.deviceId === 'default')

        const videoD = d.video.find(x => x.deviceId === cam) || d.video[0]

        setMediaLocal({ media: audioD as InputDeviceInfo })
        setMediaLocal({ media: videoD as InputDeviceInfo })
      })
    }
  }, [])

  return {
    videoLocal: video,
    audioLocal: audio,
    outputLocal: output,
    mediaLocal: media
  }
}
