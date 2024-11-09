export type ChatMessage = {
    message: string,
    sender: 'user' | 'bot',
    isFavorite: boolean
}

export interface ChatResponse {
    messages: {},
    lastKey: string | null
}