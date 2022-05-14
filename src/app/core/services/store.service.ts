import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, setDoc, getDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private firestore: Firestore,) { }

  createDoc({collectionName, data}: any) {
    return addDoc(collection(this.firestore, collectionName), data);
  }

  getEntryTimestamp(userID: string): Promise<Date | null> {
    return getDoc(doc(this.firestore, '/Users/' + userID))
      .then((doc) => { return doc.get("lastEntry").toDate() })
      .catch((e) => { console.log(e.message); return null });
  }

  setEntryTimestamp(userID: string) {
    return setDoc(doc(this.firestore, '/Users/' + userID), { lastEntry: serverTimestamp() })
  }
}
