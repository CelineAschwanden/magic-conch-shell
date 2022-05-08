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
    private authService: AuthService,
    private submitService: SubmitService,
  ) { }

  onSubmit(): void {
    this.submitService.createDoc({
      collectionName: 'Question', 
      data: {
        content: this.questionForm.value.question,
        creation_date: serverTimestamp(),
        creatorID: this.authService.getUser()?.uid,
      }
    })
    .then((data) => {
      this.sent = true;
    })
    .catch((e) => {
      this.error = true;
      console.error(e.message);
    });

    this.questionForm.reset();
  }
}
