import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';
import { Notification } from './notif-card/notification';
import { rateData } from './notif-card/rateData';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {
  
  notifList: Observable<Notification[]>;

  constructor(private store: StoreService, private auth: AuthService) { 
    this.notifList = store.getCollectionData(store.getCollectionRef('Users/' + this.auth.getUser()?.uid + '/Notifications/'), 'id') as Observable<Notification[]>;
  }

  onRate($event: rateData) {
    this.store.submitData(
      'AnswerRatings',
      {
        answerID: $event.answerID,
        userID: this.auth.getUser()?.uid,
        value: $event.value
      }
    )
    .then(data => {
      this.store.updateData('Users/' + this.auth.getUser()?.uid + '/Notifications/' + $event.notificationID, {rated: true})
      .catch((e) => {
        //add modal here
        console.log(e.message)
      });
    });
  }

  ngOnInit(): void {}
}
