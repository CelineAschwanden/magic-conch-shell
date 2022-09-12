import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Assignment } from '../core/interfaces/assignment';
import { submitInfo } from '../core/interfaces/submitInfo';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent implements OnInit {
  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  errorMessage: string = "";
  assignments: Observable<Assignment[]>;
  empty: Boolean = false;

  constructor(
    private auth: AuthService, 
    private store: StoreService,
    private modalService: NgbModal
  ) {
    const assigQuery = store.dataQuery('QuestionAssignments', 'userID', '==', this.auth.getUser()?.uid);
    this.assignments = store.getCollectionData(assigQuery, 'id') as Observable<Assignment[]>
    this.assignments.subscribe(assigs => { 
      if(assigs.length == 0) 
        this.empty = true; 
      else 
        this.empty = false;
    });
  }

  submit($event: submitInfo) {
    if($event.rateError == true) {
      this.errorMessage = "The question could not be rated.";
      this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
      return;
    }
    
      //Create answer document
      this.store.submitData(
        'Answers', {
          content: $event.content.trim(),
          questionID: $event.questionID,
          userID: this.auth.getUser()?.uid,
          timestamp: serverTimestamp(),
          assignmentID: $event.assignmentID
        }
      )
      .then(data => {
        this.assignments = this.assignments.pipe(map(assigs => {
          return assigs.filter(a => a.id != $event.assignmentID);
        }));
      })
      .catch(e => {
        this.errorMessage = "The question could not be answered.";
        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
        console.error(e.message);
      });
  }

  ngOnInit(): void {}
}