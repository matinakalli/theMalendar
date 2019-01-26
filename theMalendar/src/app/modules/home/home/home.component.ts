import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Check if the user is logged in
    this.authService.authStatus.subscribe( value => this.loggedIn = value);
  }

}
