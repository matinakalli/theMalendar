import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Details {
  id: number;
  date: string;
  title: string;
}

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Details
  ) {
    data.id = data.id;
    data.date = data.date;
    data.title = data.title;
  }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReject() {
    return this.data.id;
  }
}
