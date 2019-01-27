
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private globals: Globals) { }

  login(user) {
    return this.http.post(`${this.globals.API_URL}/login`, user);
  }

  register(user) {
    return this.http.post(`${this.globals.API_URL}/register`, user);
  }

  getUser() {
    return this.http.get(`${this.globals.API_URL}/get-user`);
  }
}
