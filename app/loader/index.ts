import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { authenticator } from '~/auth.server'
import { supabaseClient } from '~/supabase.server'

export interface IndexLoaderI {
  auth: boolean
  name: string
  lastname: string
  username: string
  avatar: string
  active: boolean
}

export const indexLoader: LoaderFunction = async ({ request }) => {
  const session = await authenticator.isAuthenticated(request)
  if (session) {
    const { data } = await supabaseClient
      .from('profiles')
      .select('name, lastname, username, avatar, active')
      .eq('id', session.user?.id)
    const user = data ? data[0] : {}
    return json({
      auth: true,
      ...user
    })
  }
  return json({
    auth: false
  })
}
