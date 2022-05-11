/* eslint-disable @typescript-eslint/no-namespace */
import twilio from 'twilio'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWILIO_ACCOUNT_SID: string
      TWILIO_ACCOUNT_TOKEN: string
    }
  }
}

if (!process.env.TWILIO_ACCOUNT_SID)
  throw new Error('TWILIO_ACCOUNT_SID is required')
if (!process.env.TWILIO_ACCOUNT_TOKEN)
  throw new Error('TWILIO_ACCOUNT_TOKEN is required')

export const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_TOKEN
)