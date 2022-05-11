import { VideoCameraIcon, TrashIcon } from '@heroicons/react/outline'
import type { MetaFunction } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Badge, Button } from 'flowbite-react'
import { Navbar } from '~/components/navbar'
import classname from 'classnames'
import type { IndexLoaderI, roomsActiveI } from '~/loader'
import { indexLoader } from '~/loader'
import date from 'dayjs'
import { VideoRoomStatus } from '~/loader/new'

export const loader = indexLoader

export const meta: MetaFunction = ({ data }) => {
  if (data.auth) {
    return {
      title: `Inicio | ${data.name}`
    }
  } else {
    return {
      title: 'Loproda team | Haz tu equipo mas eficiente',
      description:
        'Ayuda a tu equipo a gestionar sus tareas con un sistema de gestion sensillo.'
    }
  }
}

interface RoomCardPrevewProps {
  data: roomsActiveI
}

function RoomCardPrevew({ data }: RoomCardPrevewProps): JSX.Element {
  return (
    <div className="flex items-center p-4 rounded-lg mb-2 shadow-md bg-gray-100 dark:bg-gray-700">
      <div className="flex-1 min-w-0">
        <Link to={`/meet/${data.shortid}`}>
          <h3 className="text-xl truncate dark:text-white hover:underline">
            {data.name !== '' ? data.name : 'Reunion'}
          </h3>
        </Link>
        <small className="text-sm truncate block text-gray-600 dark:text-gray-400">
          {date(data.createat).format('DD/MM/YYYY hh:mm a')}
        </small>
      </div>
      {VideoRoomStatus.available === data.status && (
        <Badge color="blue" size="sm">
          Listo
        </Badge>
      )}
      {VideoRoomStatus.inSession === data.status && (
        <Badge color="green" size="sm">
          En Sesion
        </Badge>
      )}
      {VideoRoomStatus.finalized === data.status && (
        <Badge color="red" size="sm">
          Finalizado
        </Badge>
      )}
      <Button size="xs" color="red" icon={TrashIcon} className="ml-2" />
    </div>
  )
}

export default function Index() {
  const { auth, username, name, avatar, room } = useLoaderData<IndexLoaderI>()

  return (
    <div className="flex flex-col w-full h-full">
      {auth ? <Navbar user={{ name, avatar, username }} /> : <Navbar />}
      <main
        className={classname(
          'flex-1 flex items-center px-4 flex-col-reverse md:flex-row gap-4 md:gap-0',
          {
            'container mx-auto': !auth
          }
        )}
      >
        <div className="w-full md:w-2/4 px-4 md:px-0 flex-1 md:flex-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-center md:text-left dark:text-white">
            {auth
              ? 'Listo para una reunion'
              : 'Reunete con tu equipo, familiares y tus amigos'}
          </h1>
          <div className="flex flex-col lg:flex-row gap-2 w-fit items-center md:items-start mx-auto md:mx-0">
            <Form method="post">
              <input type="hidden" name="type" value="new" />
              <Link to="/new">
                <Button type="submit" tabIndex={-1}>
                  <VideoCameraIcon className="w-5 h-5 mr-2" />
                  <span>Reunion nueva</span>
                </Button>
              </Link>
            </Form>
            {/*
              <form className="flex items-center gap-2">
                <TextInput
                  placeholder="Ingresa un código o vínculo"
                  autoFocus
                />
                <Button disabled color="light" className="opacity-50">
                  Unirse
                </Button>
              </form> */}
          </div>
        </div>
        <div className="w-full md:w-2/4 h-full px-4 md:px-0 flex flex-col items-center justify-center relative">
          {room && room.length !== 0 ? (
            <div className="w-4/5 h-2/4 mx-auto overflow-auto absolute rounded-lg">
              {room.map((x, i) => (
                <RoomCardPrevew data={x} key={`room-index-preview-${i}`} />
              ))}
            </div>
          ) : (
            <img
              src="https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg"
              alt="image home"
              className="w-80 h-80 md:w-96 md:h-96 mx-auto"
              aria-hidden
            />
          )}
        </div>
      </main>
    </div>
  )
}
