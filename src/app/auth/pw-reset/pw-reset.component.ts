import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-pw-reset',
  templateUrl: './pw-reset.component.html',
  styleUrls: ['./pw-reset.component.scss']
})
export class PwResetComponent implements OnInit {

  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  sent = false;

  pwResetForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private modalService: NgbModal) { }

  get email() {
    return this.pwResetForm.get('email');
  }

  requestReset(email: string) {
    this.auth.sendPwReset(email)
    .then(r => { this.sent = true; })
    .catch(e => { 
      this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
      console.error(e); });
  }

  ngOnInit(): void {}
}
