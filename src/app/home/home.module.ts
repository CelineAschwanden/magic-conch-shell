import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule, RoutingComponent } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCardComponent } from '../answer/question-card/question-card.component';
import { NotifCardComponent } from '../notifications/notif-card/notif-card.component';

@NgModule({
  declarations: [
    RoutingComponent,
    QuestionCardComponent,
    NotifCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})

export class HomeModule { }
