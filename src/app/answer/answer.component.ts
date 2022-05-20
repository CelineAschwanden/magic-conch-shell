import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverTimestamp } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Question } from './question-card/question';
import { Assignment } from './assignment';
import { infoType, submitInfo } from './question-card/submitInfo';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {
  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  questionList: Observable<Question[]>;
  assignments: Observable<Assignment[]>;

  constructor(private auth: AuthService, private store: StoreService, private modalService: NgbModal) {
    const query = store.dataQuery('QuestionAssignments', 'userID', '==', this.auth.getUser()?.uid);
    let questions: Question[] = [];

    //Save assignments and questions into lists
    this.assignments = store.getCollectionData(query, 'id') as Observable<Assignment[]>;

    this.assignments.pipe(map(assigs => {
      assigs.forEach(assignment => {
        store.getDocSnapshot('Questions/', assignment.questionID.trim())
        .then(doc => { 
          questions.push({
            id: doc.id,
            content: doc.get('content'),
            rated: assignment.rated,
          })
          console.log(doc.data());
        })
        .catch((e) => console.log(e.message));
      });
    }));

    this.questionList = from([questions]);
  }

  ngOnInit(): void {}

  submit($event: submitInfo) {
    let assigID: string;
    this.assignments.subscribe(assig => assigID = assig.find(a => a.questionID == $event.questionID)!.id);

    //Create answer document
    if($event.type == infoType.answer) {
      this.store.submitData(
        'Answers',
        {
          content: $event.content,
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          timestamp: serverTimestamp(),
        }
      )
      .then((data) => {
        //Delete assignment
        this.store.deleteData('QuestionAssignments/' + assigID)
          .then((data) => {
            //Then remove answered question from list
            this.questionList = this.questionList.pipe(map(questions => {
              return questions.filter(question => question.id !== $event.questionID)
            }));
          })
          .catch((e) => {
            this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
            console.log(e.message);
          });
      })
      .catch(e => {
        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
        console.error(e.message)
      });
    }
    else {
      //Create rating document
      this.store.submitData(
        'QuestionRatings',
        {
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          value: $event.content
        }
      )
      .then((data) => {
        //Set rated in assignment
        this.store.updateData('QuestionAssignments/' + assigID, {rated: true})
          .then(() => {
            //Recreate list with question set to rated
            this.questionList = this.questionList.pipe(map(questions => {
              const index = questions.findIndex(q => q.id == $event.questionID);
              questions[index].rated = true;
              return questions;
            }));
          })
          .catch((e) => {
            this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
            console.log(e.message)
          });
      })
      .catch((e) => {
        console.error(e.message);
      });
    }
  }
}