import { Component, OnInit, Input } from '@angular/core';
import { Notification, Type } from './notification';

@Component({
  selector: 'app-notif-card',
  templateUrl: './notif-card.component.html',
  styleUrls: ['./notif-card.component.scss']
})

export class NotifCardComponent implements OnInit {

  @Input() notification: Notification | null = null;
  Type = Type;

  constructor() { }

  ngOnInit(): void {
  }
}
