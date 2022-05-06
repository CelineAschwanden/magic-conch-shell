import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('errorModal') errorModal : TemplateRef<any> | any;
  errorMessage = "";

  regForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  get email() {
    return this.regForm.get('email');
  }
  get password() {
    return this.regForm.get('password');
  }

  register() {
    this.auth
      .register(this.regForm.value)
      .then(() => this.router.navigate(['/login']))
      .catch((e) => {
        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
        if(e.message.includes("weak-password"))
          this.errorMessage = "Password should be at least 6 characters!";
        else if(e.message.includes("invalid-email"))
          this.errorMessage = "Invalid email";
        else
          this.errorMessage = "An error occurred, could not register.";
        console.log(e.message);
      });
  }

  ngOnInit(): void {}
}
