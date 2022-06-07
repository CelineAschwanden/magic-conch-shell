import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Notification, Type } from './notification';

@Component({
  selector: 'app-notif-card',
  templateUrl: './notif-card.component.html',
  styleUrls: ['./notif-card.component.scss']
})

export class NotifCardComponent implements OnInit {

  @Input() notification: Notification | null = null;
  Type = Type;

  notifType: Type | null = null;
  content: string = "";
  relatedTo: string = "";

  constructor(private store: StoreService, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.notification?.answerID.trim() != "") {
      this.notifType = Type.answer;
      this.store.getDocSnapshot('Answers/', this.notification!.answerID.trim())
        .then(answer => {
          this.content = answer.get('content');
          this.store.getDocSnapshot('Questions/', answer.get('questionID'))
            .then(question => this.relatedTo = question.get('content'));
        });
    }
    else if (this.notification.answerRatingID.trim() != "") {
      this.notifType = Type.answerRating;
      this.store.getDocSnapshot('AnswerRatings/', this.notification!.answerRatingID.trim())
        .then(rating => {
          if(rating.get('value') == 1)
            this.content = "up";
          else
            this.content = "down";
          
          this.store.getDocSnapshot('Answers/', rating.get('answerID').trim())
            .then(answer => this.relatedTo = answer.get('content'))
            .catch(e => console.log(e.message))
        });
    }
    else if (this.notification.questionRatingID.trim() != "") {
      this.notifType = Type.questionRating;
      this.store.getDocSnapshot('QuestionRatings/', this.notification!.questionRatingID.trim())
        .then(rating => {
          if(rating.get('value') == 1)
            this.content = "up";
          else
            this.content = "down";
          
          this.store.getDocSnapshot('Questions/', rating.get('questionID').trim())
            .then(question => this.relatedTo = question.get('content'))
        });
    }
  }

  onRate(value: number) {
    this.store.submitData(
      'AnswerRatings',
      {
        answerID: this.notification?.answerID,
        userID: this.auth.getUser()?.uid,
        value: value
      }
    )
    .then(data => {
      this.store.updateData('Users/' + this.auth.getUser()?.uid + '/Notifications/' + this.notification?.id, {rated: true})
      .catch((e) => {
        //add modal here
        console.log(e.message)
      });
    })
  }
}
