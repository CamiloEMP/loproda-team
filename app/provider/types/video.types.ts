import type { LocalAudioTrack, LocalVideoTrack } from 'twilio-video'

export type VideoContextI = useMediaLocalR

export interface useMediaLocalR {
  audioLocal: LocalAudioTrack | undefined
  videoLocal: LocalVideoTrack | undefined
  outputLocal: LocalAudioTrack | undefined
  mediaLocal: MediaInfo | undefined
}

export interface MediaInfo {
  audio: InputDeviceInfo[]
  video: InputDeviceInfo[]
  output: InputDeviceInfo[]
}
