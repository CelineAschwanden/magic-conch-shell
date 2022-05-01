import { Component, OnInit } from '@angular/core';
import { Question } from './question-card/question';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {
  questionList: Observable<Question[]>;

  constructor(firestore: Firestore) {
    const questions = collection(firestore, 'Question');

    this.questionList = collectionData(questions, { idField: 'id'}) as Observable<Question[]>;
  }

  ngOnInit(): void {
  }
}