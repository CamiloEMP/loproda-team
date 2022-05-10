import type { LoaderFunction } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { authenticator } from '~/auth.server'
import { supabaseClient } from '~/supabase.server'

export const newLoader: LoaderFunction = async ({ request }) => {
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
  return redirect('/auth/login')
}
