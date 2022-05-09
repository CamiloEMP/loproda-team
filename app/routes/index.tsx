import { useLoaderData } from '@remix-run/react'
import { Navbar } from '~/components/navbar'
import { IndexPage } from '~/components/page'
import type { IndexLoaderI } from '~/loader'
import { indexLoader } from '~/loader'

export const loader = indexLoader

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
