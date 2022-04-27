import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotifCardComponent } from './notifications/notif-card/notif-card.component';
import { QuestionCardComponent } from './answer/question-card/question-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'question', component:QuestionComponent },
  { path: 'notifications', component:NotificationsComponent },
  { path: 'answer', component:AnswerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const RoutingComponent = [HomeComponent,LoginComponent,RegisterComponent, QuestionComponent,
  AnswerComponent, NotificationsComponent, NotifCardComponent, QuestionCardComponent]
