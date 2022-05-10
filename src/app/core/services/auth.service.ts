import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, Firestore, serverTimestamp, setDoc } from '@angular/fire/firestore';

import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) { }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((credentials) => { 
        setDoc(doc(this.firestore, '/Users/' + credentials.user.uid), { lastEntry: serverTimestamp() }) //move this to backend?
      });
  }

  logout() {
    return signOut(this.auth);
  }

  getUser() {
    return this.auth.currentUser;
  }
}
