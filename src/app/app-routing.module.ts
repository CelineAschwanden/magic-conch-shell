import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotifCardComponent } from './notifications/notif-card/notif-card.component';
import { QuestionCardComponent } from './answer/question-card/question-card.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  { path: 'question', component:QuestionComponent },
  { path: 'notifications', component:NotificationsComponent },
  { path: 'answer', component:AnswerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const RoutingComponent = [QuestionComponent, AnswerComponent, NotificationsComponent, NotifCardComponent, QuestionCardComponent]
