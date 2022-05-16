import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverTimestamp } from '@angular/fire/firestore';

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

  constructor(private auth: AuthService, private store: StoreService) {
    const query = store.dataQuery('QuestionAssignments', 'userID', '==', this.auth.getUser()?.uid);
    let questions: Question[] = [];

    //Get assigned questions and push into question list
    store.getQuerySnapshot(query).then((snapshot) => {
      snapshot.docs.forEach(assignment => {
        store.getDocSnapshot('Questions/', assignment.get('questionID').trim())
          .then(doc => { questions.push({
              id: doc.id,
              content: doc.get('content'),
              rated: assignment.get('rated'),
            })
          });
      });
    });

    console.log();
    this.questionList = from([questions]);
  }

  ngOnInit(): void {}

  submit($event: submitInfo) {
    //Create answer document
    if($event.type == infoType.answer) {
      this.store.submitData(
        'Answers',
        {
          content: $event.content,
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          timestamp: serverTimestamp(),
        }
      )
      .then((data) => {
        //Remove assignment

        //Then remove answered question from list
        this.questionList = this.questionList!.pipe(map(questions => {
          return questions.filter(question => question.id !== $event.questionID)
        }));
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
    else {
      //Create rating document
      this.store.submitData(
        'QuestionRatings',
        {
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          value: $event.content
        }
      )
      .then((data) => {
        //Set to rated in assignment

        //Then ecreate list with question set to rated
        this.questionList = this.questionList!.pipe(map(questions => {
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