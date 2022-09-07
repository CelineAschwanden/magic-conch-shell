import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    this.assignments.subscribe(assigs => { 
      if(assigs.length == 0) 
        this.empty = true; 
      else 
        this.empty = false; 
    });
  }

  ngOnInit(): void {}

  submit($event: submitInfo) {
    let submissions = this.assignments.subscribe(assigs => {
      let assigID = assigs.find(a => a.questionID == $event.questionID)!.id.trim();

      //Create answer document
      if($event.type == infoType.answer) {
        this.store.submitData(
          'Answers',
          {
            content: $event.content.trim(),
            questionID: $event.questionID,
            userID: this.auth.getUser()?.uid,
            timestamp: serverTimestamp(),
            assignmentID: assigID!
          }
        )
        .then(data => {
          this.assignments = this.assignments.pipe(map(assigs => {
            return assigs.filter(a => a.id != assigID);
          }));
          this.empty = assigs.length == 0 ? true : false;
          submissions.unsubscribe();
        })
        .catch(e => {
          this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
          console.error(e.message)
          submissions.unsubscribe();
        });
      }
      else {
        //Call rate function
        
      }
    });
  }
}