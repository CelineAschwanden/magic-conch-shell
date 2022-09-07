import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';

import { AnswerMessage } from '../../core/interfaces/answerMessage';
import { Message } from '../../core/interfaces/message';
import { rateData } from 'src/app/core/interfaces/rateData';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() message: Message | null = null;
  @Output() rateEvent = new EventEmitter<rateData>();
  answerMessages: Observable<AnswerMessage[]> | null = null;
  public isCollapsed = true;

  constructor(private store: StoreService, private auth: AuthService) {}

  ngOnInit(): void {
    const answersRef = this.store.getCollectionRef(
      'Users/' + this.auth.getUser()?.uid + '/Messages/' + this.message?.id + '/Answers/');
    this.answerMessages = this.store.getCollectionData(answersRef, 'id') as Observable<AnswerMessage[]>;
  }

  onRate(answerMessageID: string, answerID: string, rateValue: number) {
    const data: rateData = {
      value: rateValue,
      contentID: answerID,
      messageID: this.message!.id, 
      answerMessageID: answerMessageID,
      assignmentID: "",
    };
    //Pass the message card's data to the history page component
    this.rateEvent.emit(data);
    //Change the answer card's status for immediate visual update
    this.answerMessages = this.answerMessages!.pipe(map(answers => {
      const messageIndex = answers.findIndex(a => a.id == answerMessageID);
      answers[messageIndex].rated = true;
      return answers;
    }));
  }
}
