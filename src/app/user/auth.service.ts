import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ProfileService }   from './profile.service';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  firstLogIn: boolean = false;
  redirectUrl: string;

  constructor(private profileService: ProfileService) {}

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
  	this.profileService.guest = true;
    this.isLoggedIn = false;
  }
}
