import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, serverTimestamp } from '@angular/fire/firestore';

import { Question } from './question-card/question';
import { infoType, submitInfo } from './question-card/submitInfo';

import { AuthService } from '../core/services/auth.service';
import { SubmitService } from '../core/services/submit.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {
  questionList: Observable<Question[]>;

  constructor(firestore: Firestore, private auth: AuthService, private submitService: SubmitService) {
    const questions = collection(firestore, 'Question');
    this.questionList = collectionData(questions, { idField: 'id'}) as Observable<Question[]>;
  }

  ngOnInit(): void {}

  submit($event: submitInfo) {
    if($event.type == infoType.answer) {
      this.submitService.createDoc({
        collectionName: 'Answer',
        data: {
          content: $event.content,
          questionID: $event.questionID,
          creatorID: this.auth.getUser()?.uid,
          creation_date: serverTimestamp(),
        }
      })
      .then((data) => {
        //recreate questionList with modified Question? (set to null or rated=true)
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
    else {
      this.submitService.createDoc({
        collectionName: 'RatingQuestion',
        data: {
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          value: $event.content
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
  }
}