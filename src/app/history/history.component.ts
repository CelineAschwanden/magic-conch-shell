import { Component, OnInit } from '@angular/core';
import { Message } from '../core/interfaces/message';

import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  messageList: Message[] | null = null;

  constructor(private store: StoreService) {
    store.messages?.subscribe(messages => { this.messageList = messages; });
  }

  ngOnInit(): void {}
}
