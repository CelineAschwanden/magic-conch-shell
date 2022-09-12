import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private http: FunctionsService) { }

  onRate(rateValue: number) {
    const data: rateData = {
      value: rateValue,
      contentID: this.answerMessage!.contentID,
      messageID: this.messageID, 
      answerMessageID: this.answerMessage!.id,
      assignmentID: "",
    };
    //Change status for immediate visual update
    this.answerMessage!.rated = true;
    this.answerMessage!.isLoadingRate = true;

    //Submit rating to backend
    this.http.sendRating(data)
    .then(() => {
      this.answerMessage!.rated = true;
      this.answerMessage!.isLoadingRate = false;
    })
    .catch(e => {
      this.answerMessage!.rated = false;
      this.answerMessage!.isLoadingRate = false;
      console.error(e.message);
    });
  }

  ngOnInit(): void {}
}
