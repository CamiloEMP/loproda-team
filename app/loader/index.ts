import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { authenticator } from '~/auth.server'
import { supabaseClient } from '~/supabase.server'
import { VideoRoomStatus } from './new'

export interface roomsActiveI {
  status: number
  name: string
  shortid: string
  createat: string
}

export interface IndexLoaderI {
  auth: boolean
  name: string
  lastname: string
  username: string
  avatar: string
  active: boolean
  room: roomsActiveI[]
}

export const indexLoader: LoaderFunction = async ({ request }) => {
  const session = await authenticator.isAuthenticated(request)
  if (session) {
    const { data } = await supabaseClient
      .from('profiles')
      .select('name, lastname, username, avatar, active')
      .eq('id', session.user?.id)
    const user = data ? data[0] : {}

    const roomsActive = await supabaseClient
      .from('meetroom')
      .select('status, name, shortid, createat')
      .eq('userid', session.user?.id)
      .neq('status', VideoRoomStatus.finalized)
      .neq('active', false)

    return json({
      auth: true,
      ...user,
      room: roomsActive.data && !roomsActive.error ? roomsActive.data : []
    })
  }
  return json({
    auth: false
  })
}
