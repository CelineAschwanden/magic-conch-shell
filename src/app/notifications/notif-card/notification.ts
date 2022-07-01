export type NotificationType = 'answer' | 'answerRating' | 'questionRating';

export interface Notification {
    id: string;
    content: string;
    context: string;
    type: NotificationType;
    rated: boolean;
    timestamp: string;
    answerID: string;
}