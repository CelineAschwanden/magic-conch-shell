import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
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
  @Output() rateError = new EventEmitter<boolean>();
  @ViewChild('collapse') collapsible: TemplateRef<NgbCollapse> | any;
  answerMessages: Observable<AnswerMessage[]> | null = null;
  public isCollapsed = true;
  loadingAnswers: boolean = false;
  answersEmpty: boolean = false;

  constructor(private store: StoreService, private auth: AuthService) {}

  getAnswers() {
    if (this.answerMessages == null) {
      this.loadingAnswers = true;
      const answersRef = this.store.getCollectionRef(
        'Users/' + this.auth.getUser()?.uid + '/Messages/' + this.message?.id + '/Answers/');

      this.answerMessages = this.store.getCollectionData(answersRef, 'id') as Observable<AnswerMessage[]>;
      this.answerMessages.subscribe(messages => {
        if (messages.length < 1)
          this.answersEmpty = true;
        else
          this.answersEmpty = false;
      });
      setTimeout(() => {
        this.loadingAnswers = false;
        this.collapsible.toggle();
      }, 400);
    } else {
      this.collapsible.toggle();
    }
  }

  passError() {
    this.rateError.emit();
  }

  ngOnInit(): void {}
}
