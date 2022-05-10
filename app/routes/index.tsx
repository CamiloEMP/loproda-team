import type { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Navbar } from '~/components/navbar'
import { IndexPage } from '~/components/page'
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
  return !auth ? (
    <IndexPage />
  ) : (
    <>
      <Navbar user={{ name, avatar, username }} />
      contenido
    </>
  )
}
