import { Injectable } from '@angular/core';
import { Firestore, query, where, collection, doc, addDoc, setDoc, 
  getDoc, serverTimestamp, WhereFilterOp, Query, DocumentData, collectionData, 
  getDocs, QuerySnapshot, DocumentSnapshot, docData, docSnapshots } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private firestore: Firestore,) { }

  submitData(collectionName: string, data: any) {
    return addDoc(collection(this.firestore, collectionName), data);
  }

  dataQuery(collectionName: string, fieldPath: string, operator: WhereFilterOp, value: any): Query<DocumentData> {
    return query(collection(this.firestore, collectionName), 
      where(fieldPath, operator, value)
    );
  }
  
  getDocSnapshot(path: string, segment: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, path, segment));
  }

  getDocSnapshotChanges(path: string) {
    return docSnapshots(doc(this.firestore, path));
  }

  getQuerySnapshot(query: Query<DocumentData>): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query);
  }

  getDocData(path: string, idField: string) {
    return docData(doc(this.firestore, path), {idField: idField});
  }

  getCollectionData(query: Query<DocumentData>, idField: string): Observable<DocumentData[]> {
    return collectionData(query, {idField: idField});
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
