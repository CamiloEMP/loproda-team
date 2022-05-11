import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { authenticator } from '~/auth.server'
import { supabaseClient } from '~/supabase.server'
import type { IndexLoaderI } from '.'

export interface meetSlugLoaderI
  extends Pick<IndexLoaderI, 'name' | 'username' | 'avatar'> {
  auth: boolean // usuario autenticado
  room: boolean // existe la sala
  admin: boolean // el usuario es administrador
  inSesion: boolean // si la reunion esta en sesion (si ha iniciado)
  access: boolean // si el usuario tiene acceso a la reunion
}

/**
 * @description verifica si la reunion existe y si el usuario tiene acceso
 */
export const meetSlugLoader: LoaderFunction = async ({ params, request }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = String(params.slug)
  const data: meetSlugLoaderI = {
    room: false,
    auth: false,
    admin: false,
    inSesion: false,
    access: false,
    name: '',
    avatar: '',
    username: ''
  }

  // 1 verificar la reunion en la base de datos
  const room = await supabaseClient
    .from('meetroom')
    .select('userid, active')
    .eq('shortid', id)

  if (room.data && room.data.length === 0) return json({ room: false })
  data.room = true

  // 1.1 si la reunion inicio
  data.inSesion = room.data ? room.data[0].active : false

  // 2 verificar una sesion activa
  const sesion = await authenticator.isAuthenticated(request)

  if (!sesion) return json({ room: false, auth: false })
  data.auth = true

  // 2.1 obtener datos del usuario
  const user = await supabaseClient
    .from('profiles')
    .select('name, avatar, username')
    .eq('id', sesion.user?.id)

  if (user.data && user.data.length !== 0) {
    data.name = user.data[0].name
    data.username = user.data[0].username
    data.avatar = user.data[0].avatar
  }

  // 2.2 Verificar si el usuario es administrador de la reunion (si es administrador, retornar { admin: true })
  data.admin = room.data ? room.data[0].userid === sesion.user?.id : false

  // 2.3 Verificar si el usuario tiene acceso a la reunion
  /** PENDIENTE */
  data.access = data.admin

  // retornar datos segun la interface {meetSlugLoaderI}
  return json({ ...data })
}
