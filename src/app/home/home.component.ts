import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { StoreService } from '../core/services/store.service';
import { MessagingService } from '../core/services/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  notifEnabled: boolean = false;

  constructor(private modalService: NgbModal, private store: StoreService, private auth: AuthService, private router: Router, private messaging: MessagingService) {
    messaging.token.subscribe((token) => {if(token) {this.notifEnabled = true} else {this.notifEnabled = false}});
  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

 requestPermission() {
  Notification.requestPermission();

  this.messaging.token.subscribe((token) => {
    this.store.updateData('Users/'+this.auth.getUser()!.uid, { messagingToken: token })
    .then((data) => this.notifEnabled = true)
    .catch(e => console.error(e))
  })
 }

  logout() {
    this.auth
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message))
  }

  ngOnInit(): void {}
}
