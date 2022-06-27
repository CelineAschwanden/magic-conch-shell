import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, tap, of, Subject, BehaviorSubject } from 'rxjs';
import { StoreService } from './store.service';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  token: Observable<any> = EMPTY;
  message: Observable<any> = EMPTY;
  tokenSaved: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private messaging: Messaging, private store: StoreService, private auth: AuthService) {
    this.message = new Observable(sub => onMessage(messaging, msg => sub.next(msg))).pipe(
      tap(msg => console.log('FCM', {msg})),
    );
  }

  getRegistration() {
    this.token = from(
      navigator.serviceWorker.register('firebase-messaging-sw.js', { type: 'module', scope: '__' })
      .then(serviceWorkerRegistration =>
        getToken(this.messaging, {serviceWorkerRegistration, vapidKey: environment.vapidKey})
        .then((token) => {
          this.saveToken(token);
          return token;
        })
      ).catch((e) => {
        console.error(e); return '';
      })
    );
  }

  saveToken(token: string) {
    onAuthStateChanged(this.auth.getAuth(), (user) => {
      if (user)
        this.store.updateData('Users/' + this.auth.getUser()!.uid, { messagingToken: token })
        .then(r => this.tokenSaved.next(true))
        .catch((e) => console.error(e));
    })
  }
}
