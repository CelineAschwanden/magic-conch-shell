import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Notification } from './notification';
import { rateData } from './rateData';

@Component({
  selector: 'app-notif-card',
  templateUrl: './notif-card.component.html',
  styleUrls: ['./notif-card.component.scss']
})

export class NotifCardComponent implements OnInit {

  @Input() notification: Notification | null = null;
  @Output() rateEvent = new EventEmitter<rateData>();

  constructor() {}
  ngOnInit(): void {}

  onRate(rateValue: number) {
    const data: rateData = {answerID: this.notification!.answerID, value: rateValue, notificationID: this.notification!.id};
    this.rateEvent.emit(data);
  }
}
