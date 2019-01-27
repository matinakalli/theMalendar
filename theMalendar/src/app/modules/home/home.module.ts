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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddEventModalComponent } from './calendar/add-event-modal/add-event-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginModalComponent,
    RegisterModalComponent,
    CalendarComponent,
    AddEventModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  exports: [
    HomeComponent,
  ],
  entryComponents: [
    LoginModalComponent,
    RegisterModalComponent,
    AddEventModalComponent
  ],
})
export class HomeModule { }
