import { LoginModalComponent } from './../../login-modal/login-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterModalComponent } from '../../register-modal/register-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

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

  ngOnInit() {
  }

}
