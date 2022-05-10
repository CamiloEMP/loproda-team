import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Navbar } from '~/components/navbar'
import type { IndexLoaderI } from '~/loader'
import { newLoader } from '~/loader/new'

export const loader: LoaderFunction = newLoader

export default function CreateMeetRoom(): JSX.Element {
  const { name, avatar, username } = useLoaderData<IndexLoaderI>()
  return (
    <>
      <Navbar user={{ name, username, avatar }} />
    </>
  )
}
