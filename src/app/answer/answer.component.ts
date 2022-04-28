import { Component, OnInit } from '@angular/core';
import { Question } from './question-card/question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  questionList: Question[] = [
    { id: "JKQNHvXJ9iyqcFg", content: "What is the weirdest food combination you enjoy?" },
    { id: "4puYfoYXjwfUl5h", content: "What fictional character would you most likely be friends with?" }
  ]

  constructor() { }
  ngOnInit(): void {
  }
}
