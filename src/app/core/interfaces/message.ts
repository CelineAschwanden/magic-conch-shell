export type MessageType = 'question' | 'answer';

export interface Message {
    id: string;
    content: string;
    context: string;
    type: MessageType;
    thumbsUp: number;
    thumbsDown: number;
    timestamp: string;
}