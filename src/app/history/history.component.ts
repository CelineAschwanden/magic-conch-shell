import { Component, OnInit } from '@angular/core';
import { StoreService } from '../core/services/store.service';
import { Message } from './message-card/message';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  messageList: Message[] | null = null;

  constructor(private store: StoreService) {
    store.messages?.subscribe(messages => { this.messageList = messages; console.log(this.messageList) });
  }

  ngOnInit(): void {
  }

}
