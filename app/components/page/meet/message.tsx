import { Button, Label, TextInput } from 'flowbite-react'
import type { meetSlugLoaderI } from '~/loader/meet.slug'

interface BoxLogoProps {
  children: JSX.Element
  isActive?: boolean
}

export function BoxLogo({ children, isActive }: BoxLogoProps): JSX.Element {
  return <div className="bg-gray-800 rounded-full pointer">{children}</div>
}

export function RequestAccess(): JSX.Element {
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

export function NoAuth(): JSX.Element {
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

export function JoinRoom({
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
