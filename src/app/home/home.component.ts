import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { MessagingService } from '../core/services/messaging.service';
import { StoreService } from '../core/services/store.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild('successModal') successModal: TemplateRef<any> | any;
  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  notifEnabled: boolean = false;
  feedbackLimited: boolean = false;
  newAnswer: boolean = false;
  modalref: any;

  constructor(
    private modalService: NgbModal, 
    private auth: AuthService, 
    private router: Router, 
    private messaging: MessagingService, 
    private store: StoreService
  ) {
    this.updateSettings();
    store.messages?.pipe(skip(1)).subscribe(messages => { this.newAnswer = true; });
  }

  openModal(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  logout() {
    this.auth
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message))
  }
  
  enableNotifications() {
    this.messaging.getRegistration()
    this.messaging.tokenSaved.subscribe((value) => {
      if (value == true)
        this.updateSettings();
    });
  }

  sendFeedback(value: string) {
    let limit = 0;
    this.store.getDocSnapshot('Settings/limits', '')
      .then(limits => limit = limits.get('questionLimit'))
      .catch(e => { 
        console.error(e.message);
      });

    this.modalService.dismissAll();
    this.store.submitData(
      'Feedback', {
        content: value, 
        userID: this.auth.getUser()?.uid
      }
    )
    .then(res => {
      this.modalService.dismissAll();
      this.modalService.open(this.successModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
    })
    .catch(e => {
      //Check timestamp of last entry 
      this.store.getFeedbackTimestamp(this.auth.getUser()!.uid)
        .then((entryTime) => {
          if(entryTime != null && limit > (Math.floor((Date.now() - entryTime!.getTime()) / 1000)))
            this.feedbackLimited = true;
        })

      console.error(e.message);
      this.modalService.dismissAll();
      this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
    });
  }

  updateSettings() {
    if (Notification.permission === 'granted')
      this.notifEnabled = true;
    else
      this.notifEnabled = false;
  }

  ngOnInit(): void {}
}
