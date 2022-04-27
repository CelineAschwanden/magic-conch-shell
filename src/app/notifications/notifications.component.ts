import { Component, OnInit } from '@angular/core';
import { Notification, Type } from './notif-card/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {
  
  notifList: Notification[] = [
    {
      type: Type.answer,
      content: 'This is an answer',
      question: 'Lorem ipsum dolor sit amet'
    },
    {
      type: Type.rating,
      content: 'positive',
      question: 'Lorem ipsum dolor sit amet 2'
    },
    {
      type: Type.answer,
      content: 'This is an answer',
      question: 'Lorem ipsum dolor sit amet'
    },
    {
      type: Type.rating,
      content: 'positive',
      question: 'Lorem ipsum dolor sit amet 2'
    },
    {
      type: Type.answer,
      content: 'This is an answer',
      question: 'Lorem ipsum dolor sit amet'
    }
  ];

  clearNotifs() {
    this.notifList.length = 0;
  }

  constructor() { }
  ngOnInit(): void {
  }
}
