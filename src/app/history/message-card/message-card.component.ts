import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';

import { AnswerMessage } from '../../core/interfaces/answerMessage';
import { Message } from '../../core/interfaces/message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() message: Message | null = null;
  answerMessages: Observable<AnswerMessage[]> | null = null;
  public isCollapsed = true;

  constructor(private store: StoreService, private auth: AuthService) {}

  ngOnInit(): void {
    const answersRef = this.store.getCollectionRef(
      'Users/' + this.auth.getUser()?.uid + '/Messages/' + this.message?.id + '/Answers/');
    this.answerMessages = this.store.getCollectionData(answersRef, 'id') as Observable<AnswerMessage[]>;
  }
}
