import { ChatMessage } from "../interfaces/chatInterface";
import admin from 'firebase-admin'
import { ChatResponse } from "../interfaces/dialogFlowInterface";

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

export const getMessages = async (uuid: string, lastKey: string | null = null, pageSize = 2): Promise<ChatResponse> => {
  const db = admin.database()
  const ref = db.ref(`/${uuid}/chat`)
  let query

  if(lastKey) {
    query = ref.orderByKey().startAfter(lastKey).limitToFirst(pageSize)
  } else {
    query = ref.orderByKey().limitToFirst(pageSize);
  }

  try {
    const snapshot = await query.once("value")
    const messages = snapshot.toJSON()

    if (!messages) {
      return { messages: {}, lastKey: null }
    }

    const keys = Object.keys(messages)
    const newLastKey = keys[keys.length - 1]

    return {messages, lastKey: newLastKey}
    
  } catch (error) {
    console.error('Unable to get chat messages', error)
    throw Error('Unable to get chat messages')
  }
}