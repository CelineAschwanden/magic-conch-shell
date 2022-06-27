import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { MessagingService } from '../core/services/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  notifEnabled: boolean = false;

  constructor(private modalService: NgbModal, private auth: AuthService, private router: Router, private messaging: MessagingService) {
    this.updateSettings();
  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  enableNotifications() {
    this.messaging.getRegistration()
    this.messaging.tokenSaved.subscribe((value) => {
      if (value == true)
        this.updateSettings();
    });
  }

  logout() {
    this.auth
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message))
  }

  updateSettings() {
    if (Notification.permission === 'granted')
      this.notifEnabled = true;
    else
      this.notifEnabled = false;
  }

  ngOnInit(): void {}
}
