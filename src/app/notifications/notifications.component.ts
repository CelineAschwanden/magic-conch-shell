import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';
import { Notification } from './notif-card/notification';

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

  ngOnInit(): void {}
}
