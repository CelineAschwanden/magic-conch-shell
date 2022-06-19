import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, tap, share } from 'rxjs';
import { StoreService } from './store.service';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  token: Observable<any> = EMPTY;
  message: Observable<any> = EMPTY;

  constructor(private messaging: Messaging, private store: StoreService, private auth: AuthService) {
    this.message = new Observable(sub => onMessage(messaging, it => sub.next(it)));
    this.token = from(getToken(this.messaging, { vapidKey: environment.vapidKey }))
    .pipe(tap((token) => {this.store.updateData('Users/'+this.auth.getUser()!.uid, { messagingToken: token })}), share());

    this.message.subscribe(message => console.log(message));
  }
}
