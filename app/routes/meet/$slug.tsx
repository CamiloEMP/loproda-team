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
import type { Room } from 'twilio-video'
import { connect, ConnectOptions } from 'twilio-video'
import { useEffect, useState } from 'react'
import { MeetPreMeet } from '../../components/page/meet.premeet'
import { MeetInMetting } from '../../components/page/meet.meeting'
import { MeetPost } from '../../components/page/meet.postmeet'
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
  const [room, setRoom] = useState<Room>({} as Room)
  const params = useParams()
  const action = useActionData()
  const loader = useLoaderData<meetSlugLoaderI>()
  useEffect(() => {
    if (action?.token !== null && action?.token !== undefined) {
      const room: Room = connect(action?.token, { name: params.slug })
      setRoom(room) // tal vez funcione pero no se si el token sea valido bota un error cuando uno quiere acceder a las propiedades
      console.log(room.name) // undefined
    }
  }, [action?.token, params.slug])

  return (
    <VideoProvider>
      {!room.name ? (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <MeetPreMeet slug={params.slug!} loader={loader} />
      ) : (
        <MeetInMetting />
      )}
      {/* <MeetPost /> seria que cuando se salga de la llamada hay si se
      muestre este componente */}
    </VideoProvider>
  )
}
