import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FunctionsService } from 'src/app/core/services/functions.service';
import { StoreService } from 'src/app/core/services/store.service';

import { Assignment } from '../../core/interfaces/assignment';
import { submitInfo, infoType } from '../../core/interfaces/submitInfo';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})

export class QuestionCardComponent implements OnInit {

  @Input() assignment: Assignment | null = null;
  @Output() submitEvent = new EventEmitter<submitInfo>();

  answer: string = "";
  isAnswering: boolean = false;
  loadingRating = false;

  constructor(private store: StoreService, private http: FunctionsService) { }

  submitRating(value: number) {
    this.loadingRating = true;
    this.assignment!.rated = true;

    console.log({
      value: value,
      contentID: this.assignment!.questionID,
      messageID: "",
      answerMessageID: "",
      assignmentID: this.assignment!.id
    });
    this.http.sendRating({
      value: value,
      contentID: this.assignment!.questionID,
      messageID: "",
      answerMessageID: "",
      assignmentID: this.assignment!.id
    })
    .then(() => {
      this.loadingRating = false;
      this.assignment!.rated = true;
    })
    .catch((e) => {
      this.loadingRating = false;
      this.assignment!.rated = false;
      this.submitEvent.emit({rateError: true, questionID: "", content: "", assignmentID: ""});
    });
  }

  submitAnswer(value: string) {
    const info: submitInfo = {
      questionID: this.assignment!.questionID,
      content: value, 
      assignmentID: this.assignment!.id, 
      rateError: false
    };
    this.submitEvent.emit(info);
  }

  ngOnInit(): void {}
}
