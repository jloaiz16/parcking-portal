import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.user = this.auth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  login(username: string, password: string): Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(username, password);
  }

  isLoggedIn(): boolean {
    return this.userDetails ? true : false;
  }

  logout(): void {
    this.auth.auth.signOut().then(res => this.router.navigate(['/login']));
  }
}
