
export enum infoType {
    answer,
    rating
}

export interface submitInfo {
    content: string;
    questionID: string;
    assignmentID: string;
    rateError: boolean;
}