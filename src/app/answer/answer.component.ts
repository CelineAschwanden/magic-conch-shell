import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collection, query, where, getDocs, serverTimestamp, collectionData } from '@angular/fire/firestore';

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
    const q = query(collection(firestore, 'Question'), where('userID', '!=', this.auth.getUser()?.uid));
    this.questionList = collectionData(q, { idField: 'id'}) as Observable<Question[]>;
  }

  ngOnInit(): void {}

  submit($event: submitInfo) {
    if($event.type == infoType.answer) {
      this.submitService.createDoc({
        collectionName: 'Answer',
        data: {
          content: $event.content,
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          timestamp: serverTimestamp(),
        }
      })
      .then((data) => {
        //Remove answered question from list
        this.questionList = this.questionList.pipe(map(questions => {
          return questions.filter(question => question.id !== $event.questionID)
        }))
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
      .then((data) => {
        //recreate list with question set to rated
        //let question = this.questionList.pipe(map((questions: Question[]) => questions.find((q: Question) => q.id == $event.questionID)));
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
  }
}