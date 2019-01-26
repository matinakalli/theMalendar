import { TokenService } from './../../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material';
import { LoginModalComponent } from '../../home/login-modal/login-modal.component';
import { RegisterModalComponent } from '../../home/register-modal/register-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class MenuComponent implements OnInit {
  public loggedIn: boolean;

  constructor(public dialog: MatDialog, private authService: AuthService,
    private router: Router, private tokenService: TokenService) {}

  loginModal(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '350px',
    });
  }

  registerModal(): void {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '450px',
    });
  }

  // Logout user: delete token and change status of user
  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenService.deleteToken();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    // Check if the user is logged in
    this.authService.authStatus.subscribe( value => this.loggedIn = value);
  }

}
