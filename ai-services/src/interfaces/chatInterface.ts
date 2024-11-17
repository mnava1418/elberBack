export type ChatMessage = {
    text: string,
    sender: 'user' | 'bot',
    isFavorite: boolean,
    id: string
}

export interface ChatResponse {
    messages: ChatMessage[],
    lastKey: string | null
}