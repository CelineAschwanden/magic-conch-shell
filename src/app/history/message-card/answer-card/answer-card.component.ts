import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnswerMessage } from 'src/app/core/interfaces/answerMessage';
import { rateData } from 'src/app/core/interfaces/rateData';
import { FunctionsService } from 'src/app/core/services/functions.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {

  @Input() answerMessage: AnswerMessage | null = null;
  @Input() messageID: string = "";
  @Output() rateError = new EventEmitter<boolean>();

  constructor(private http: FunctionsService) { }

  onRate(rateValue: number) {
    const data: rateData = {
      value: rateValue,
      contentID: this.answerMessage!.answerID,
      messageID: this.messageID, 
      answerMessageID: this.answerMessage!.id,
      assignmentID: "",
    };
    //Change status for immediate visual update
    this.answerMessage!.rated = true;

    //Submit rating to backend
    this.http.sendRating(data)
    .catch(e => {
      this.answerMessage!.rated = false;
      this.rateError.emit();
      console.error(e.message);
    });
  }

  ngOnInit(): void {}
}
