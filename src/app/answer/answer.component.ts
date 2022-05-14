import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collection, query, where, getDocs, serverTimestamp, collectionData } from '@angular/fire/firestore';

import { Question } from './question-card/question';
import { infoType, submitInfo } from './question-card/submitInfo';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {
  questionList: Observable<Question[]>;

  constructor(firestore: Firestore, private auth: AuthService, private store: StoreService) {
    //Gets all existing questions from other users
    const q = query(collection(firestore, 'Questions'), where('userID', '!=', this.auth.getUser()?.uid));
    this.questionList = collectionData(q, { idField: 'id'}) as Observable<Question[]>;
  }

  ngOnInit(): void {}

  submit($event: submitInfo) {
    //Create answer document
    if($event.type == infoType.answer) {
      this.store.createDoc({
        collectionName: 'Answers',
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
        }));
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
    else {
      //Create rating document
      this.store.createDoc({
        collectionName: 'QuestionRatings',
        data: {
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          value: $event.content
        }
      })
      .then((data) => {
        //recreate list with question set to rated
        this.questionList = this.questionList.pipe(map(questions => {
          const index = questions.findIndex(q => q.id == $event.questionID);
          questions[index].rated = true;
          return questions;
        }));
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
  }
}