import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  assignments: Observable<Assignment[]>;
  empty: Boolean = false;

  constructor(private auth: AuthService, private store: StoreService, private modalService: NgbModal) {
    const assigQuery = store.dataQuery('QuestionAssignments', 'userID', '==', this.auth.getUser()?.uid);
    this.assignments = store.getCollectionData(assigQuery, 'id') as Observable<Assignment[]>
    this.assignments.subscribe(assigs => { if(assigs.length == 0) this.empty = true; else this.empty = false; });
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