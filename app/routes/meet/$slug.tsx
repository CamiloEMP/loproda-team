import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { meetSlugLoaderI } from '~/loader/meet.slug'
import { meetSlugLoader } from '~/loader/meet.slug'

export const loader: LoaderFunction = meetSlugLoader

export default function MeetSlug(): JSX.Element {
  const loader = useLoaderData<meetSlugLoaderI>()
  return (
    <div className="dark:text-white">{JSON.stringify(loader, null, 4)}</div>
  )
}
