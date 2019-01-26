import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private globals: Globals) { }

  // handle the token after login and save it in localstorage
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  // check if the token given is valid
  isValid() {
    const token = this.getToken();
    // check if token exists
    if (token) {
      // split the token and take only the payload of jwt
      const payload = token.split('.')[1];

      // decode the payload
      const decodedPL = JSON.parse(atob(payload));
      if (decodedPL) {
        // check if the url of the decoded payload is the right one (login or register)
        if ( (decodedPL.iss === `${this.globals.API_URL}/login`) || (decodedPL.iss === `${this.globals.API_URL}/register`) ) {
          return true;
        }
        return false;
      }
      return false;
    }
  }

  // check if the user is logged in
  loggedIn() {
    return this.isValid();
  }

}
