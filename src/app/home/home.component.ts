import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { MessagingService } from '../core/services/messaging.service';
import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild('successModal') successModal: TemplateRef<any> | any;
  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  notifEnabled: boolean = false;
  modalref: any;

  constructor(
    private modalService: NgbModal, 
    private auth: AuthService, 
    private router: Router, 
    private messaging: MessagingService, 
    private store: StoreService
  ) {
    this.updateSettings();
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
    this.modalService.dismissAll();
    this.store.submitData('Feedback', {content: value})
    .then(res => {
      this.modalService.dismissAll();
      this.modalService.open(this.successModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
    })
    .catch(e => {
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
