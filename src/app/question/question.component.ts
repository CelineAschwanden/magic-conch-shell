import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Firestore, doc, collection, addDoc } from '@angular/fire/firestore';
import { serverTimestamp } from '@firebase/firestore';

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
    private firestore: Firestore,
    private formBuilder: FormBuilder,
  ) { }

  onSubmit(): void {
    addDoc(
      collection(this.firestore, 'Question'),
      {content: this.questionForm.value.question, 
        creation_date: serverTimestamp(), 
        creatorID: doc(this.firestore, 'User/fr8pNiqVX4821Iht0T20')
      }
    ).then((data) => {
      this.sent = true;
    })
    .catch((errorReason) => {
      this.error = true;
      console.error(errorReason);
    });

    this.questionForm.reset();
  }
}
