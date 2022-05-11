import type { LocalAudioTrack, LocalVideoTrack } from 'twilio-video'

export interface VideoParticipantProps {
  video: LocalVideoTrack
  audio: LocalAudioTrack
}
