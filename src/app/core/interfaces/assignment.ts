import { Timestamp } from '@angular/fire/firestore' 

export interface Assignment {
    id: string;
    questionContent: string,
    questionID: string;
    rated: boolean;
    userID: string;
    timestamp: Timestamp;
}