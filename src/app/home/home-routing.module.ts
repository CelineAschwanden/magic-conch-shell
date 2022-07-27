import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { QuestionComponent } from '../question/question.component';
import { AnswerComponent } from '../answer/answer.component';
import { HistoryComponent } from '../history/history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'answer', component: AnswerComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
export const RoutingComponent = [HomeComponent, QuestionComponent, AnswerComponent, HistoryComponent]
