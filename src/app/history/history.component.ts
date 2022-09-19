import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Message } from '../core/interfaces/message';

import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  errorMessage: string = "";
  messageList: Message[] | null = null;
  empty: boolean = false;

  constructor(private store: StoreService) {
    store.messages?.subscribe(messages => {
      console.log(messages + ' ' + messages.length);
      this.messageList = messages;
      if (messages.length < 1 || messages == null)
        this.empty = true;
      else
        this.empty = false; 
    });
  }

  ngOnInit(): void {}
}
