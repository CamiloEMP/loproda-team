import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { VideoContextI } from '../types/video.types'
import { useMediaLocal } from './useLocalMedia'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const VideoContext = createContext<VideoContextI>(null!)

export function VideoProvider({
  children
}: PropsWithChildren<unknown>): JSX.Element {
  const mediaLocal = useMediaLocal()
  return (
    <VideoContext.Provider value={{ ...mediaLocal }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideoProvider = () => useContext(VideoContext)
