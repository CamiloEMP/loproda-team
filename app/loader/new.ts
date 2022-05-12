import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { v4 } from 'uuid'
import { authenticator } from '~/auth.server'
import { supabaseClient } from '~/supabase.server'
import ShortId from 'short-unique-id'

export enum VideoRoomStatus {
  available, // Sala lista para iniciar la reunion
  inSession, // Sala en sesion
  finalized // La sala termino la reunion para todos
}

export const newLoader: LoaderFunction = async ({ request }) => {
  // 1 verificar la sesion
  const session = await authenticator.isAuthenticated(request)
  if (!session) return redirect('/auth/login?redirect=/new')

  // 2 Retornar el usuario
  const { data } = await supabaseClient
    .from('profiles')
    .select('name, lastname, username, avatar, active')
    .eq('id', session.user?.id)
  const user = data ? data[0] : {}

  if (Object.keys(user).length === 0) return redirect('/auth/login')

  // 3 comprobar suscripsion
  /** PENDIENTE */

  // 4 crear el registro de la reunion en supabase db [meetroom]
  const roomName = v4()
  const uid = new ShortId()
  const id = uid()
  const meetdb = await supabaseClient.from('meetroom').insert({
    active: true,
    userid: session.user?.id,
    twiliomax: 2, // por el momento
    twilioname: roomName,
    status: VideoRoomStatus.available,
    name: '',
    description: '',
    shortid: String(id).toLocaleLowerCase()
  })

  // redireccionar
  return redirect(meetdb.data ? `/meet/${meetdb.data[0].shortid}` : '/')
}
