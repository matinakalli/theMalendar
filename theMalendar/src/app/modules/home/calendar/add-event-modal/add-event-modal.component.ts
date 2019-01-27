import { EventsService } from './../../../../services/events.service';
import { Component, Optional, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { TokenService } from 'src/app/services/token.service';
import { DatePipe } from '@angular/common';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DateDetails {
  dateDetails: Date;
}

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {
  public createEventForm = {
    title: null,
    attendees: null,
    place: null,
    description: null,
    time: null,
    user_id: null
  };
  public error = [];

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddEventModalComponent>,
    private usersService: UsersService, public messageBar: MatSnackBar,
    private eventsService: EventsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DateDetails) {
      data.dateDetails = data.dateDetails;
    }

  public titleFormControl = new FormControl('', [
    Validators.required
  ]);

  public attendeesFormControl = new FormControl('', [
    Validators.required
  ]);

  public placeFormControl = new FormControl('', [
    Validators.required,
  ]);

  public descriptionFormControl = new FormControl('', [
    Validators.required
  ]);

  public timeFormControl = new FormControl('', [
    Validators.required
  ]);

  public matcher = new MyErrorStateMatcher();
  public pipe = new DatePipe('en-US');

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    let user_id: number;
    this.usersService.getUser()
    .subscribe(
      user => {
        user_id = user['id'];
        const newEvent = {
          title: this.createEventForm.title,
          place: this.createEventForm.place,
          attendees: this.createEventForm.attendees,
          description: this.createEventForm.description,
          date: this.pipe.transform(this.data.dateDetails, 'd-MM-y'),
          time: this.createEventForm.time,
          user_id: user_id,
        };
        console.log(newEvent);
        this.eventsService.createEvent(newEvent)
        .subscribe(
          response => console.log(response),
          error => this.handleError(error)
        );
      });
  }

  // Handle the data of the response when successfull
  handleResponse(response) {
    console.log(response);
  }

  handleError(error) {
    this.error = error.error.errors;
  }


}
