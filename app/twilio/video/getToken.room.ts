import AccessToken, { VideoGrant } from 'twilio/lib/jwt/AccessToken'

interface getTokenI {
  identity: string
  roomName: string
}

export function getToken({ roomName, identity }: getTokenI) {
  const accesToken = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_ACCOUNT_TOKEN,
    { identity }
  )

  const videoGrand = new VideoGrant({
    room: roomName
  })

  accesToken.addGrant(videoGrand)
  return {
    token: accesToken.toJwt(),
    tll: accesToken.ttl
  }
}
