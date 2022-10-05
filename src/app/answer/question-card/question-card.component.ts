import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FunctionsService } from 'src/app/core/services/functions.service';

import { Assignment } from '../../core/interfaces/assignment';
import { submitInfo } from '../../core/interfaces/submitInfo';

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
  timestampDate: Date = new Date; 
  limitTime: string = '00:00';

  constructor(private http: FunctionsService) {}

  ngOnInit(): void {
    this.timestampDate = this.assignment?.timestamp.toDate()!;
    this.limitTime = new Date(this.timestampDate.getTime() + 7*60000)
      .toTimeString().split(' ')[0].slice(0, -3);
    let minute = parseInt(this.limitTime.slice(-1));
    if (minute < 6 && minute > 1)
      this.limitTime = this.limitTime.replace(/.$/,"6");
    else
      this.limitTime = this.limitTime.replace(/.$/,"1");
  }

  submitRating(value: number) {
    //change status for immediate visual update
    this.assignment!.rated = true;

    this.http.sendRating({
      value: value,
      contentID: this.assignment!.questionID,
      messageID: "",
      answerMessageID: "",
      assignmentID: this.assignment!.id
    })
    .catch((e) => {
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

  extendTimeLimit() {
    console.log(this.assignment?.extended);
    if (this.assignment?.extended == false)
      this.http.extendAnswerTimeLimit(this.assignment.id)
      .catch(e => console.log(e));
  }
}
