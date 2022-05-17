import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  @ViewChild('errorModal') errorModal: TemplateRef<any> | any;
  errorMessage = "";

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor( private modalService: NgbModal, private formBuilder: FormBuilder,
    private readonly auth: AuthService, private readonly router: Router,
  ) { }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.auth
      .login(this.loginForm.value)
      .then(() => this.router.navigate(['/home']))
      .catch((e) => {
        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
        if(e.message.includes("user-not-found" || e.message.includes("wrong-password")))
          this.errorMessage = "Wrong email or password";
        else
          this.errorMessage = "An error occurred, could not login.";
        console.log(e.message);
      });
  }

  ngOnInit(): void {}
}
