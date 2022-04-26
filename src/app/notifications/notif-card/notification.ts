export enum Type {
    answer,
    rating
}

export interface Notification {
    type: Type;
    content: string;
    question: string;
}