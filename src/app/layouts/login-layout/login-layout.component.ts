import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserLogin } from 'src/app/shared/models/login.model';
import { email } from 'src/app/shared/utils/regExp.const';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

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
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(email)]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.user = this.loginForm.getRawValue();
    this.authentication.login(this.user.username, this.user.password).then(
      user => {
        this.isInvalid = false;
        this.router.navigate(['/']);
      },
      error => {
        this.isInvalid = true;
        console.log(error);
      }
    );
  }
}
