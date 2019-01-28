import { EventsService } from './../../../../services/events.service';
import { Component, Optional, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface EventDetails {
  event_id: number;
}

@Component({
  selector: 'app-update-event-modal',
  templateUrl: './update-event-modal.component.html',
  styleUrls: ['./update-event-modal.component.scss']
})
export class UpdateEventModalComponent implements OnInit {
  // take the response message and assign the class
  public message$ = null;
  public messageClass$ = null;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<UpdateEventModalComponent>,
    public messageBar: MatSnackBar,
    private eventsService: EventsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EventDetails) {
      data.event_id = data.event_id;
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

  public event;

  ngOnInit() {
    this.eventsService.getEvent(this.data.event_id)
    .subscribe(response => {
      this.event = response;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.eventsService.updateEvent(this.event)
      .subscribe(
        data => {
          console.log('Updated event successfully', data);
        },
        error => {
          this.handleError(error.status);
          console.log('Error', error);
        }
      );

      this.dialogRef.close();
  }

  // handle errors in pending invitations acceptance or rejection
  handleError(status) {
    if (status === 200) {
      this.message$ = 'Success: The event was successfully updated.';
      this.messageClass$ = 'alert-success';
    } else {
      this.message$ = 'Error: The event was not changed.';
      this.messageClass$ = 'alert-error';
    }

    this.messageBar.open(this.message$, '', {
      duration: 4000,
      panelClass: [this.messageClass$]
    });
  }


}
