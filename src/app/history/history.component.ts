import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

import { Message } from '../core/interfaces/message';
import { rateData } from '../core/interfaces/rateData';
import { FunctionsService } from '../core/services/http-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  messageList: Message[] | null = null;

  constructor(private store: StoreService, private auth: AuthService, private http: FunctionsService) {
    store.messages?.subscribe(messages => { this.messageList = messages; });
  }

  onRate($event: rateData) {
    this.http.sendRating($event)
    .catch(e => console.error(e.message));
  }

  ngOnInit(): void {}
}
