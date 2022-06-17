import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Messaging } from '@angular/fire/messaging';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal, private auth: AuthService, private router: Router, private messaging: Messaging) { }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  requestPermission() {
    Notification.requestPermission();
  }

  logout() {
    this.auth
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message))
  }

  ngOnInit(): void {}
}
