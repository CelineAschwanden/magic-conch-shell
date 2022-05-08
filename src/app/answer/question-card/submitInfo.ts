
export enum infoType {
    answer,
    rating
}

export interface submitInfo {
    questionID: string;
    content: string;
    type: infoType;
}