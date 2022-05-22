import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';

import { Assignment } from '../assignment';
import { submitInfo, infoType } from './submitInfo';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})

export class QuestionCardComponent implements OnInit {

  @Input() assignment: Assignment | null = null;
  @Output() submitEvent = new EventEmitter<submitInfo>();

  content: string = "";
  answer: string = "";
  isAnswering: boolean = false;
  infoType = infoType;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.store.getDocSnapshot('Questions/', this.assignment!.questionID.trim())
    .then(question => this.content = question.get('content'));
  }

  onSubmit(type: infoType, value: string) {
    const info: submitInfo = {questionID: this.assignment!.questionID, content: value, type: type};
    this.submitEvent.emit(info);
  }
}
