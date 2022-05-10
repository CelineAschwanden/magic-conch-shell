import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, setDoc, serverTimestamp, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class SubmitService {
  constructor(private firestore: Firestore,) { }

  createDoc({collectionName, data}: any) {
    return addDoc(collection(this.firestore, collectionName), data);
  }

  setEntryTimestamp(userID: string) {
    return setDoc(doc(this.firestore, '/Users/' + userID), { lastEntry: serverTimestamp() })
  }

  async getEntryTimestamp(userID: string) {
    return getDoc(doc(this.firestore, '/Users/' + userID))
      .then((doc) => { return doc.get("lastEntry").toDate() })
      .catch((e) => { console.log(e.message); return null });
  }
}
