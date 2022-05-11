import type { VideoParticipantProps } from './types'

function rootMeanSquare(samples: Uint8Array) {
  const sumSq = samples.reduce((sumSq, sample) => sumSq + sample * sample, 0)
  return Math.sqrt(sumSq / samples.length)
}

export async function analizeAudio(
  track: VideoParticipantProps['audio'],
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
