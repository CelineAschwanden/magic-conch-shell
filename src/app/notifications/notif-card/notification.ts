export enum Type {
    answer,
    questionRating,
    answerRating
}

export interface Notification {
    id: string;
    answerID: string;
    answerRatingID: string;
    questionRatingID: string;
    rated: boolean;
}