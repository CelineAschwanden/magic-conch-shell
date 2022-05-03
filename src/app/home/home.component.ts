import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  closeResult = '';

  constructor(private modalService: NgbModal) { }

  openInfo(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  ngOnInit(): void {
  }

}
