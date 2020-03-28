import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserLogin } from 'src/app/shared/models/login.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { email } from 'src/app/shared/utils/regExp.const';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {
  public isInvalid = false;
  public loginForm: FormGroup;
  public user: IUserLogin = {
    username: null,
    password: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(email)]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.user = this.loginForm.getRawValue();
    this.auth.auth
      .signInWithEmailAndPassword(this.user.username, this.user.password)
      .then(
        user => {
          this.isInvalid = false;
          console.log(user);
        },
        error => {
          this.isInvalid = true;
          console.log(error);
        }
      );
  }
}
