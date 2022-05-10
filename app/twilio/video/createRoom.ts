import type { RoomRoomType, RoomInstance } from 'twilio/lib/rest/video/v1/room'
import { twilioClient } from '../client'

interface createRoomVideoTwilioI {
  name: string
  type?: RoomRoomType
}

export async function createRoomVideoTwilio({
  name,
  type
}: createRoomVideoTwilioI): Promise<RoomInstance> {
  const newRoom = await twilioClient.video.rooms.create({
    uniqueName: name,
    type: type || 'go'
  })

  return newRoom
}
