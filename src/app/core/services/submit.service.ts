import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class SubmitService {
  constructor(private firestore: Firestore,) { }

  createDoc({ collectionName, data }: any) {
    return addDoc(collection(this.firestore, collectionName), data);
  }
}
