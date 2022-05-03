import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { signInWithEmailAndPassword, getAuth, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({email: '', password: ''});
  @ViewChild('errorModal') errorModal : TemplateRef<any> | any;
  error = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private auth: Auth, 
    private modalService: NgbModal
  ) { }

  login(){
    const firebaseAuth = getAuth(this.auth.app);
    signInWithEmailAndPassword(firebaseAuth, this.loginForm.value.email, this.loginForm.value.password)
      .then((userCredential) => {
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', centered: true});
        console.log(error);
      });
  };

  ngOnInit(): void {
  }
}
