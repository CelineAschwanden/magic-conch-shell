import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../core/interfaces/message';

import { StoreService } from '../core/services/store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  @ViewChild('rateErrorModal') rateErrorModal: TemplateRef<any> | any;
  errorMessage: string = "";
  messageList: Message[] | null = null;
  empty: boolean = false;

  constructor(private store: StoreService, private modalService: NgbModal) {
    store.messages?.subscribe(messages => {
      this.messageList = messages;
      if (messages.length < 1 || messages == null)
        this.empty = true;
      else
        this.empty = false; 
    });
  }

  displayRateError() {
    this.modalService.open(this.rateErrorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  ngOnInit(): void {}
}
