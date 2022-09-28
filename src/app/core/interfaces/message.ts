export type MessageType = 'question' | 'answer';

import { Timestamp } from '@angular/fire/firestore' 

export interface Message {
    id: string;
    content: string;
    context: string;
    type: MessageType;
    thumbsUp: number;
    thumbsDown: number;
    timestamp: Timestamp;
}