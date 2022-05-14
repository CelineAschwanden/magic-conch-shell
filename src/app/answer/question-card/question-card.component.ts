import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Question } from './question';
import { submitInfo, infoType } from './submitInfo';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})

export class QuestionCardComponent implements OnInit {

  @Input() question: Question | null = null;
  @Output() submitEvent = new EventEmitter<submitInfo>();

  answer: string = "";
  isAnswering: boolean = false;
  infoType = infoType;

  constructor() { }

  ngOnInit(): void {
    this.question!.rated = this.question!.rated ?? false;
  }

  onSubmit(type: infoType, value: string) {
    const info: submitInfo = {questionID: this.question!.id, content: value, type: type};
    this.submitEvent.emit(info);
  }
}
