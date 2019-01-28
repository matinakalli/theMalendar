import { AuthService } from './../../../services/auth.service';
import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {
  public registerForm = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };
  public error = {
    email: null,
    password: null
  };

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RegisterModalComponent>,
    private usersService: UsersService, public messageBar: MatSnackBar,
    private tokenService: TokenService,
    private authService: AuthService) {}

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  public nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  public passwordConfirmationFormControl = new FormControl('', [
    Validators.required
  ]);

  public matcher = new MyErrorStateMatcher();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegister() {
    this.usersService.register(this.registerForm)
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

  handleError(error) {
    this.error = error.error.errors;
  }

}
