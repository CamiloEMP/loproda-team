import type { RoomRoomType, RoomInstance } from 'twilio/lib/rest/video/v1/room'
import { twilioClient } from '../client'

interface findOrCreateRoomI {
  name: string
  type?: RoomRoomType
}

export async function findOrCreateRoom({
  name,
  type
}: findOrCreateRoomI): Promise<RoomInstance> {
  try {
    return await twilioClient.video.rooms(name).fetch()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.code === 20404) {
      return twilioClient.video.rooms.create({
        uniqueName: name,
        type: type || 'go'
      })
    } else {
      throw e
    }
  }
}
