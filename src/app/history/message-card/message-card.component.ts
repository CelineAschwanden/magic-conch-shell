import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';

import { AnswerMessage } from './answerMessage';
import { Message } from './message';
import { rateData } from './rateData';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() message: Message | null = null;
  @Output() rateEvent = new EventEmitter<rateData>();
  answers: Observable<AnswerMessage[]> | null = null;
  public isCollapsed = true;

  constructor(private store: StoreService, private auth: AuthService) {}

  ngOnInit(): void {
    const answersRef = this.store.getCollectionRef(
      'Users/' + this.auth.getUser()?.uid + '/Messages/' + this.message?.id + '/Answers/');
    this.answers = this.store.getCollectionData(answersRef, 'id') as Observable<AnswerMessage[]>;
    this.answers.subscribe(a => console.log(a));
  }

  onRate(answerID: string, rateValue: number) {
    const data: rateData = {answerID: answerID, value: rateValue, messageID: this.message!.id};
    this.rateEvent.emit(data);
  }
}
