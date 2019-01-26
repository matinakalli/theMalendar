import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());

  // whenever the variable loggedIn changes it changes the authStatus
  authStatus = this.loggedIn.asObservable();

  // change the status of the user
  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  constructor(private tokenService: TokenService) { }
}
