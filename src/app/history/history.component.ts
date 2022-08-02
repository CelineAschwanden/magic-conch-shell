import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

import { Message } from './message-card/message';
import { rateData } from './message-card/rateData';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  messageList: Message[] | null = null;

  constructor(private store: StoreService, private auth: AuthService) {
    store.messages?.subscribe(messages => { this.messageList = messages; });
  }

  onRate($event: rateData) {
    this.store.submitData(
      'Users/' + this.auth.getUser()?.uid + '/Ratings', {
        answerID: $event.answerID,
        value: $event.value,
      }
    ).then(() => {
      this.store.updateData('Users/' + this.auth.getUser()?.uid + '/Messages/' + $event.messageID + '/Answers/' + $event.answerID, 
        {rated: true})
      .catch(e => { console.error(e) });
    })
    .catch(e => { console.error(e) });
  }

  ngOnInit(): void {}
}
