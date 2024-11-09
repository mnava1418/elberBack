import { ChatMessage } from "../interfaces/chatInterface";
import admin from 'firebase-admin'

export const saveChatMessages = async(uuid: string, data: ChatMessage[]) => {
  try {
    const db = admin.database()
    const path = `/${uuid}/chat`
    const messages: {[key: string]: ChatMessage} = {}

    data.forEach((message, index) => {
      const timestamp = Date.now().toString()
      messages[`${path}/${timestamp}${index}`] = message
    })

    await db.ref().update(messages)
  } catch (error) {
    console.error(error)
    throw Error('Unable to save messages')
  }
}
