import { Injectable } from '@angular/core';
import { Firestore, query, where, collection, doc, addDoc, 
  getDoc, WhereFilterOp, Query, DocumentData, collectionData, 
  QuerySnapshot, DocumentSnapshot, docData, docSnapshots, getDocsFromServer, updateDoc, FieldPath, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private firestore: Firestore,) { }

  submitData(collectionName: string, data: any) {
    return addDoc(collection(this.firestore, collectionName), data);
  }

  updateData(path: string, data: object): Promise<void> {
    return updateDoc(doc(this.firestore, path), data);
  }

  deleteData(path: string) {
    return deleteDoc(doc(this.firestore, path));
  }

  dataQuery(collectionName: string, fieldPath: string | FieldPath, operator: WhereFilterOp, value: any): Query<DocumentData> {
    return query(collection(this.firestore, collectionName), 
      where(fieldPath, operator, value),
    );
  }
  
  getDocSnapshot(path: string, segment: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, path, segment));
  }

  getDocSnapshotChanges(path: string) {
    return docSnapshots(doc(this.firestore, path));
  }

  getQuerySnapshot(query: Query<DocumentData>): Promise<QuerySnapshot<DocumentData>> {
    return getDocsFromServer(query);
  }

  getDocData(path: string, idField: string) {
    return docData(doc(this.firestore, path), {idField: idField});
  }

  getCollectionRef(path: string): CollectionReference<DocumentData> {
    return collection(this.firestore, path);
  }

  getCollectionData(query: Query<DocumentData> | CollectionReference<DocumentData>, idField: string): Observable<DocumentData[]> {
    return collectionData(query, {idField: idField});
  }

  getEntryTimestamp(userID: string): Promise<Date | null> {
    return getDoc(doc(this.firestore, '/Users/' + userID))
      .then((doc) => { 
        if ( doc.get("lastEntry") != undefined )
          return doc.get("lastEntry").toDate();
        else
          return null;
      });
  }
}
