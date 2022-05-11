import { VideoCameraIcon } from '@heroicons/react/outline'
import type { MetaFunction } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Button } from 'flowbite-react'
import { Navbar } from '~/components/navbar'
import classname from 'classnames'
import type { IndexLoaderI } from '~/loader'
import { indexLoader } from '~/loader'

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

export default function Index() {
  const { auth, username, name, avatar } = useLoaderData<IndexLoaderI>()

  return (
    <div className="flex flex-col w-full h-full">
      {auth ? <Navbar user={{ name, avatar, username }} /> : <Navbar />}
      <main
        className={classname(
          'flex-1 flex items-center px-4 items-center flex-col-reverse md:flex-row gap-4 md:gap-0',
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
        <div className="w-full md:w-2/4 px-4 md:px-0">
          <img
            src="https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg"
            alt="image home"
            className="w-80 h-80 md:w-96 md:h-96 mx-auto"
            aria-hidden
          />
        </div>
      </main>
    </div>
  )
}
