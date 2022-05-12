import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { serverTimestamp } from '@angular/fire/firestore';

import { AuthService } from '../core/services/auth.service';
import { SubmitService } from '../core/services/submit.service';

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
    private submit: SubmitService,
  ) { }

  onSubmit(): void {
    //Create question document
    this.submit.createDoc({
      collectionName: 'Questions', 
      data: {
        content: this.questionForm.value.question,
        timestamp: serverTimestamp(),
        userID: this.auth.getUser()?.uid,
      }
    })
    .then((data) => {
      //Set timestamp
      this.submit.setEntryTimestamp(this.auth.getUser()!.uid); // todo: move to backend
      this.sent = true;
    })
    .catch((e) => {
      //Check timestamp of last entry 
      this.submit.getEntryTimestamp(this.auth.getUser()!.uid)
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
