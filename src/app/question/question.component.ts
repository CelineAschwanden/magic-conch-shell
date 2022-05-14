import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { serverTimestamp } from '@angular/fire/firestore';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent {

  questionForm = this.formBuilder.group({question: ''});
  sent = false;
  error = false;
  restrictionTime = 0;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private store: StoreService,
  ) { }

  onSubmit(): void {
    //Create question document
    this.store.createDoc({
      collectionName: 'Questions', 
      data: {
        content: this.questionForm.value.question,
        timestamp: serverTimestamp(),
        userID: this.auth.getUser()?.uid,
      }
    })
    .then((data) => {
      //Set timestamp
      this.store.setEntryTimestamp(this.auth.getUser()!.uid); // todo: move to backend
      this.sent = true;
    })
    .catch((e) => {
      //Check timestamp of last entry 
      this.store.getEntryTimestamp(this.auth.getUser()!.uid)
        .then((entryTime) => {
          if(entryTime != null && 180 > (Math.floor((Date.now() - entryTime!.getTime()) / 1000))) // todo: get limit from database
            this.restrictionTime = 180 - (Math.floor((Date.now() - entryTime!.getTime()) / 1000));
          else
            this.restrictionTime = 0;
        })

      this.error = true;
      console.error(e.message);
    });

    this.questionForm.reset();
  }
}
