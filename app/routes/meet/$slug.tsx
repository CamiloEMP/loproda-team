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
import { CameraIcon, CogIcon, MicrophoneIcon } from '@heroicons/react/outline'
import { Button, Label, TextInput } from 'flowbite-react'

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

interface BoxLogoProps {
  children: JSX.Element
  isActive?: boolean
}

function BoxLogo({ children, isActive }: BoxLogoProps): JSX.Element {
  return <div className="bg-gray-800 rounded-full pointer">{children}</div>
}

function RequestAccess(): JSX.Element {
  return (
    <>
      <h3 className="text-black dark:text-white text-2xl sm:text-4xl font-bold">
        ¿Listo para Unirte?
      </h3>
      <p className="text-gray-600 dark:text-gray-400 sm:text-lg max-w-[40ch] text-center">
        1 persona ya está en la llamada
      </p>
      <Button>Solicitar acceso</Button>
    </>
  )
}

function WaitingRoom(): JSX.Element {
  return (
    <>
      <h3 className="text-black dark:text-white text-2xl sm:text-4xl font-bold">
        La reunión aun no ha empezado
      </h3>
      <p className="text-gray-600 dark:text-gray-400 sm:text-lg max-w-[40ch] text-center">
        1 persona ya esta en la llamada
      </p>
      <Button>Entrar a la sala de espera</Button>
    </>
  )
}

function NoAuth(): JSX.Element {
  return (
    <>
      <h3 className="text-black dark:text-white text-2xl sm:text-4xl font-bold">
        ¿Estas Listo?
      </h3>
      <p className="text-gray-600 dark:text-gray-400 sm:text-lg max-w-[40ch] text-center">
        Para acceder a esta sala, debes iniciar sesión o poner tu nombre para
        solicitar acceso.
      </p>
      <div className="flex flex-col">
        <Label className="block mb-2 md:text-lg" htmlFor="name">
          Nombre
        </Label>
        <div className="flex gap-4 items-center">
          <TextInput
            className="w-full"
            id="name"
            placeholder="Pepito Perez"
            required={true}
          />
          <Button>Solicitar Acceso</Button>
        </div>
      </div>
    </>
  )
}

function JoinRoom({
  access,
  inSesion,
  admin,
  auth,
  room
}: meetSlugLoaderI): JSX.Element {
  if (!auth) return <NoAuth /> // No authentication
  if (!access) return <RequestAccess /> // solicited access
  if (!inSesion) return <WaitingRoom /> // waiting for session to start
  else {
    // in session with access or admin
    return (
      <>
        <h3 className="text-black dark:text-white text-2xl sm:text-4xl font-bold">
          ¿Listo para Unirte?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 sm:text-lg">
          1 persona ya esta en la llamada
        </p>
        <Button size="lg">Unirse</Button>
      </>
    )
  }
}
