export type ChatMessage = {
    message: string,
    sender: 'user' | 'bot',
    isFavorite: boolean
}