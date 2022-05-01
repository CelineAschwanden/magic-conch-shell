import { Component, OnInit } from '@angular/core';
import { Question } from './question-card/question';
import { Firestore, collectionData, collection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {
  questionList: Observable<DocumentData>;

  constructor(firestore: Firestore) {
    const questions = collection(firestore, 'Question');
    this.questionList = collectionData(questions);
    console.log(this.questionList);
  }

  ngOnInit(): void {
  }
}
