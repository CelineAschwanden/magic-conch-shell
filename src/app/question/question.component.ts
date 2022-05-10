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

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private submit: SubmitService,
  ) { }

  onSubmit(): void {
    this.submit.createDoc({
      collectionName: 'Questions', 
      data: {
        content: this.questionForm.value.question,
        timestamp: serverTimestamp(),
        userID: this.auth.getUser()?.uid,
      }
    })
    .then((data) => {
      this.submit.setEntryTimestamp(this.auth.getUser()!.uid); //move to backend
      this.sent = true;
    })
    .catch((e) => {
      if(this.submit.getEntryTimestamp(this.auth.getUser()!.uid) != null) {
        console.log(this.submit.getEntryTimestamp(this.auth.getUser()!.uid));
      }
      this.error = true;
      console.error(e.message);
    });

    this.questionForm.reset();
  }
}
