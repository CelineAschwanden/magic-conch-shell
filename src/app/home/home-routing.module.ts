import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { QuestionComponent } from '../question/question.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AnswerComponent } from '../answer/answer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'answer', component: AnswerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
export const RoutingComponent = [HomeComponent, QuestionComponent, AnswerComponent, NotificationsComponent]
