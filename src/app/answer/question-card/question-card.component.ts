import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() question: Question | null = null;
  answer: string = "";
  isAnswering: boolean = false;

  constructor() { }
  ngOnInit(): void {
  }

}
