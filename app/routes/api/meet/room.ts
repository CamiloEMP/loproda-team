import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'

export interface MeetRoomApi {
  auth: boolean
  access: boolean
  token: string
}

export const loader: LoaderFunction = () => {
  const data: MeetRoomApi = {
    auth: false,
    access: false,
    token: ''
  }

  return json(data)
}
