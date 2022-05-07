import { Component, OnInit } from '@angular/core';
import { Notification, Type } from './notif-card/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {
  
  notifList: Notification[] = [];

  clearNotifs() {
    this.notifList.length = 0;
  }

  constructor() { }
  ngOnInit(): void {}
}
