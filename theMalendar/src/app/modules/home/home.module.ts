import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from './../shared/shared.module';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddEventModalComponent } from './calendar/add-event-modal/add-event-modal.component';
import { UpdateEventModalComponent } from './calendar/update-event-modal/update-event-modal.component';
import { ConfirmDeleteModalComponent } from './calendar/confirm-delete-modal/confirm-delete-modal.component';
import { LoginModalFormComponent } from './login-modal-form/login-modal-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterModalComponent,
    CalendarComponent,
    AddEventModalComponent,
    UpdateEventModalComponent,
    ConfirmDeleteModalComponent,
    LoginModalFormComponent
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
    RegisterModalComponent,
    AddEventModalComponent,
    UpdateEventModalComponent,
    ConfirmDeleteModalComponent,
    LoginModalFormComponent
  ],
})
export class HomeModule { }
