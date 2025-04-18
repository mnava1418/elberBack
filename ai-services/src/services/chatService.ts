import { ChatMessage, ChatResponse } from "../interfaces/chatInterface";
import admin from 'firebase-admin'

export const saveChatMessages = async(uuid: string, data: ChatMessage[]) => {
  try {
    const db = admin.database()
    const path = `/${uuid}/chat`
    const messages: {[key: string]: ChatMessage} = {}

    data.forEach((message) => {
      messages[`${path}/${message.id}`] = message
    })

    await db.ref().update(messages)
  } catch (error) {
    console.error(error)
    throw Error('Unable to save messages')
  }
}

export const getMessages = async (uuid: string, lastKey: string | null = null, pageSize = 50): Promise<ChatResponse> => {
  try {
    const db = admin.database()
    const ref = db.ref(`/${uuid}/chat`)
    let query = ref.orderByKey().limitToLast(pageSize + (lastKey ? 1 : 0));

    if(lastKey) {
      query = query.endAt(lastKey)
    } 

    const snapshot = await query.once("value")
    const data = snapshot.toJSON() as Record<string, ChatMessage>

    if (!data) {
      return { messages: [], lastKey: null }
    }

    const messages = Object.values(data).reverse()
    
    if (lastKey && messages[0]?.id === lastKey) {
      messages.shift();
    }
    
    const keys = Object.keys(data)
    const newLastKey = keys.length > 0 ? keys[0] : null

    return {messages, lastKey: newLastKey}
    
  } catch (error) {
    console.error('Unable to get chat messages', error)
    throw Error('Unable to get chat messages')
  }
}

export const deleteMessages = async(uuid: string, messageId: string | null = null) => {
  try {
    const db = admin.database()
    let query = `/${uuid}/chat`

    if(messageId) {
      query = `${query}/${messageId}`
    }

    const ref = db.ref(query)
    await ref.remove()
  } catch (error) {
    console.error('Unable to delete messages', error)
    throw Error('Unable to delete messages')
  }
}

export const setIsFavorite = async (uuid: string, messageId: string, isFavorite: boolean) => {
  try {
    const db = admin.database()
    const ref = db.ref(`/${uuid}/chat/${messageId}`)
    await ref.update({isFavorite})
  } catch (error) {
    console.error(error)
    throw Error('Unable to set isFavorite')
  }
}