import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from './../shared/shared.module';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginModalComponent,
    RegisterModalComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    HomeComponent,
  ],
  entryComponents: [
    LoginModalComponent,
    RegisterModalComponent
  ],
})
export class HomeModule { }
