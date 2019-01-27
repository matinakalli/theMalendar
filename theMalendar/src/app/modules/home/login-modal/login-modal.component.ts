import { AuthService } from './../../../services/auth.service';
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { TokenService } from 'src/app/services/token.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class LoginModalComponent {
  public loginForm = {
    email: null,
    password: null
  };
  public error = null;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<LoginModalComponent>,
    public messageBar: MatSnackBar, private usersService: UsersService,
    private tokenService: TokenService, private router: Router,
    private authService: AuthService) {}

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  public matcher = new MyErrorStateMatcher();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogin() {
    this.usersService.login(this.loginForm)
    .subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  // Handle the data of the response when successfull
  handleResponse(data) {
    this.tokenService.storeToken(data.access_token);   // store the token
    this.authService.changeAuthStatus(true);

  }

  // Save the response error and print it to the interface
  handleError(error) {
    this.error = error.error.error;

    const message$ = `Error: ${this.error}.`;

    this.messageBar.open(message$, '', {
      duration: 4000,
      panelClass: ['alert-error']
    });
  }

}


