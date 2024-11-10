export type ChatMessage = {
    message: string,
    sender: 'user' | 'bot',
    isFavorite: boolean,
    id: string
}

export interface ChatResponse {
    messages: {[key:string]: ChatMessage},
    lastKey: string | null
}