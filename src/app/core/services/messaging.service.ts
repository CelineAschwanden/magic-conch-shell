import { Injectable, Optional } from '@angular/core';
import { EMPTY, from, Observable, tap, share } from 'rxjs';
import { StoreService } from './store.service';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  token: Observable<any> = EMPTY;
  message: Observable<any> = EMPTY;

  constructor(private messaging: Messaging, private store: StoreService, private auth: AuthService, private router: Router) {
    if (Notification.permission === 'granted') {
      this.getRegistration();
    }
    this.message = new Observable(sub => onMessage(messaging, it => sub.next(it))).pipe(
      tap(token => console.log('FCM', {token})),
    );
  }

  async getRegistration() {
    this.token = from(
      navigator.serviceWorker.register('firebase-messaging-sw.js', { type: 'module', scope: '__' })
      .then(async serviceWorkerRegistration =>
        getToken(this.messaging, {serviceWorkerRegistration, vapidKey: environment.vapidKey})
      ).catch((e) => {
        console.error(e); return '';
      }
      )).pipe(
        tap((token) => {this.saveToken(token);}), 
        share()
      );
  }

  saveToken(token: string): Promise<void> {
    return this.store.updateData('Users/' + this.auth.getUser()!.uid, { messagingToken: token })
      .catch(e => console.error(e));
  }
}
