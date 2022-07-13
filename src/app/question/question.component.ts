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
    let limit = 0;
    this.store.getDocSnapshot('Settings/limits', '')
      .then(limits => limit = limits.get('questionLimit'))
      .catch(e => { 
        this.error = true; 
        console.error(e.message) 
      });

    //Create question document
    this.store.submitData(
      'Questions', {
        content: this.questionForm.value.question.trim(),
        timestamp: serverTimestamp(),
        userID: this.auth.getUser()?.uid,
      }
    )
    .then((data) => {
      this.sent = true;
    })
    .catch((e) => {
      //Check timestamp of last entry 
      this.store.getEntryTimestamp(this.auth.getUser()!.uid)
        .then((entryTime) => {
          if(entryTime != null && limit > (Math.floor((Date.now() - entryTime!.getTime()) / 1000)))
            this.restrictionTime = limit - (Math.floor((Date.now() - entryTime!.getTime()) / 1000));
          else
            this.restrictionTime = 0;
        })

      this.error = true;
      console.error(e.message);
    });

    this.questionForm.reset();
  }
}
