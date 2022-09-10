import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';

import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private auth: Auth) { }

  getAuth(): Auth {
    return this.auth;
  }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser() {
    return this.auth.currentUser;
  }

  sendPwReset(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  reAuth(password: string) {
    const credentials = EmailAuthProvider.credential(this.auth.currentUser?.email!, password);
    return reauthenticateWithCredential(this.auth.currentUser!, credentials);
  }
}
