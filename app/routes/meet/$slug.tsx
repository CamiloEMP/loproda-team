import type { LoaderFunction } from '@remix-run/node'
import type { meetSlugLoaderI } from '~/loader/meet.slug'
import { meetSlugLoader } from '~/loader/meet.slug'
import { MeetPreMeet } from '~/components/page/meet.premeet'
import { useLoaderData } from '@remix-run/react'
import { MeetInMetting } from '~/components/page/meet.meeting'
import { VideoProvider } from '~/provider/video'
import { MeetPost } from '~/components/page/meet.postmeet'

export const loader: LoaderFunction = meetSlugLoader

export default function MeetSlug(): JSX.Element {
  const loader = useLoaderData<meetSlugLoaderI>()
  return (
    <VideoProvider>
      <MeetPreMeet loader={loader} />
      <MeetInMetting />
      <MeetPost />
    </VideoProvider>
  )
}
