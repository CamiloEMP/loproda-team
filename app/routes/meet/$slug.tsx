import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { meetSlugLoaderI } from '~/loader/meet.slug'
import { meetSlugLoader } from '~/loader/meet.slug'
import { Form, useActionData, useLoaderData, useParams } from '@remix-run/react'
import { VideoProvider } from '~/provider/video'
import { supabaseClient } from '~/supabase.server'
import { findOrCreateRoom } from '~/twilio/video/findOrCreate.room'
import { getToken } from '~/twilio/video/getToken.room'
import { v4 } from 'uuid'

export const loader: LoaderFunction = meetSlugLoader

export const action: ActionFunction = async ({ request }) => {
  const f = await request.formData()

  if (!f.has('slug')) return json({ error: 'slug' })
  const meet = await supabaseClient
    .from('meetroom')
    .select('twilioname, twiliomax, userid')
    .eq('shortid', f.get('slug'))

  if (meet.error || !meet.data) return json({ error: 'db' })

  const roomName = meet.data ? meet.data[0].twilioname : ''
  await findOrCreateRoom({ name: roomName, type: 'go' })

  const token = getToken({ roomName, identity: v4() })
  return json({ ...token })
}

export default function MeetSlug(): JSX.Element {
  const params = useParams()
  const action = useActionData()
  const loader = useLoaderData<meetSlugLoaderI>()

  return (
    <VideoProvider>
      <div className="text-white"></div>
      <Form method="post">
        <input type="hidden" name="slug" value={params.slug} />
        <button type="submit">obtener token o unirse</button>
      </Form>
      {JSON.stringify(action)}
      {/*

      <MeetPreMeet loader={loader} />
      <MeetInMetting />
      <MeetPost />
  */}
    </VideoProvider>
  )
}
