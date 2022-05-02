import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({email: '', password: ''});

  constructor(private formBuilder: FormBuilder) { }

  login(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.value.email, this.loginForm.value.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  ngOnInit(): void {
  }
}
