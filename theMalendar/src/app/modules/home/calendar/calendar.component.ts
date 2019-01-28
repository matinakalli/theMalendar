import { UpdateEventModalComponent } from './update-event-modal/update-event-modal.component';
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { EventsService } from 'src/app/services/events.service';
import { delay } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';

export interface DayEventList {
  id: number;
  title: string;
  place: string;
  description: string;
  attendees: string;
  time: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public months = [];
  public chosenMonth;
  public changedChosenMonth;
  public currentYear;
  public weekDays = [];
  public dates = [];

  public emptyCells;
  public availableEvents = [];

  // take the reservations message and assign the class
  public message$ = null;
  public messageClass$ = null;

  // vars for the datatable
  public chosenDay = null;
  public pipe = new DatePipe('en-US');
  public displayedColumns: string[] = [
    'title',
    'place',
    'description',
    'time',
    'actions'
  ];
  events: any;
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // filter function for the datatable
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public dialog: MatDialog, private eventsService: EventsService,
    public messageBar: MatSnackBar) {}

  ngOnInit() {
    // get current year
    this.currentYear = new Date().getFullYear();

    // get months' names in the array
    for (let i = 1; i <= 12; i++) {
      this.months.push(moment(i, 'MM').format('MMMM'));
    }

    // initial view is with current month
    this.chosenMonth = moment().format('MMMM');
    this.changedChosenMonth = this.chosenMonth;

    // get week days
    this.weekDays = moment.weekdaysShort();

    // get dates of the currect month
    this.dates = this.getDaysOfMonth(
      +moment(this.chosenMonth, 'MMMM').format('M') - 1,
      this.currentYear
    );

    // find the number of weekday according to the week so we can have spaces before starting the month
    this.emptyCells = this.getNumberOfWeekDay(
      this.pipe.transform(this.dates[0], 'E')
    );

    // find if there are events in every day
    this.dates.forEach(date => {
      date = moment(date).startOf('day');
      date = this.pipe.transform(date, 'd-MM-y');
      this.countDateEvents(date);
    });
  }

  // get all the days of a month
  getDaysOfMonth(month, year) {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  // fill the calendar with the chosen month's days
  onChoseMonth() {
    const monthNumber = +moment(this.chosenMonth, 'MMMM').format('M') - 1;
    this.dates = this.getDaysOfMonth(monthNumber, this.currentYear);
    this.emptyCells = this.getNumberOfWeekDay(
      this.pipe.transform(this.dates[0], 'E')
    );

    // change the month of the calendar view
    this.changedChosenMonth = this.chosenMonth;

    // re-initialize availableEvents array
    this.availableEvents = [];

    // find if there are events in every day
    this.dates.forEach(date => {
      date = moment(date).startOf('day');
      date = this.pipe.transform(date, 'd-MM-y');
      this.countDateEvents(date);
    });
  }

  // find the number of week day according to each week
  // ex. Monday is 1, Tuesday is 2 etc...
  getNumberOfWeekDay(weekday: string) {
    const numbersArray = [];
    let found = false;
    this.weekDays.forEach(day => {
      if (!found) {
        if (day === weekday) {
          found = true;
        } else {
          numbersArray.push('');
        }
      }
    });
    return numbersArray;
  }

  // on click of the plus -> open add event modal
  addEventModal(date): void {
    const dialogRef = this.dialog.open(AddEventModalComponent, {
      width: '550px',
      data: { dateDetails: date }
    });
  }

  // on click of the eye -> open see day schedule modal
  viewDayScheduleModal(date): void {
    this.chosenDay = date;
    date = moment(date).startOf('day');
    date = this.pipe.transform(date, 'd-MM-y');
    this.fillDatatable(date);
  }

  // take the events for a day
  countDateEvents(date) {
    return this.eventsService.countEventsOfDate(date).subscribe(response => {
      if ( response > 0) {
        this.availableEvents.push(1);
      } else {
        this.availableEvents.push(0);
      }
    });
  }

  // fill the datatable
  fillDatatable(date) {
    const dayEventData: DayEventList[] = [];

    this.eventsService.getEventsOfDate(date).subscribe(response => {
        this.events = response;
        this.events.forEach(element => {
            const newDayEvent = {
              title: element.title,
              place: element.place,
              time: element.time,
              description: element.description,
              attendees: element.attendees,
              id: element.id
            };
            dayEventData.push(newDayEvent);
        });
        this.dataSource = '';
        this.dataSource = new MatTableDataSource<DayEventList>(
          dayEventData.slice()
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  editEvent(event_id: number, date, i: number) {
    const dialogRef = this.dialog.open(UpdateEventModalComponent, {
      width: '500px',
      data: {
        event_id: event_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.eventsService.updateEvent(event).subscribe(
          response => {console.log(response); },
          error => {
            this.handleError(error, i);
          }
        );

        // refresh datatable
        date = moment(date).startOf('day');
        date = this.pipe.transform(date, 'd-MM-y');
        this.fillDatatable(date);
      }
    });
  }

  deleteEvent(event_id: number, date: string, title: string, i: number): void {
      const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
        width: '400px',
        data: {
          id: event_id,
          date: date,
          title: title
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.eventsService.deleteEvent(event_id).subscribe(
            response => {console.log(response); },
            error => {
              this.handleError(error, i);
            }
          );
        }
      });
  }

  // handle errors in pending invitations acceptance or rejection
  handleError(error, i) {
    console.log(error);
    if (error.status === 200) {
      this.message$ =
        'Success: The event was successfully deleted.';
      this.messageClass$ = 'alert-success';

      // delete row from table
      const data = this.dataSource.data;
      data.splice(this.paginator.pageIndex * this.paginator.pageSize + i, 1);
      this.dataSource.data = data;
    } else {
      this.message$ =
        'Error: This event cannot be deleted. ' +
        error.error.message;
      this.messageClass$ = 'alert-error';
    }

    this.messageBar.open(this.message$, '', {
      duration: 4000,
      panelClass: [this.messageClass$]
    });
  }

}
