import { AddEventModalComponent } from './add-event-modal/add-event-modal.component';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public months = [];
  public chosenMonth;
  public currentYear;
  public weekDays = [];
  public dates = [];

  public emptyCells;
  public availableEvents: boolean;

  public pipe = new DatePipe('en-US');

  constructor(public dialog: MatDialog, private eventsService: EventsService) {}

  ngOnInit() {
    // get current year
    this.currentYear = new Date().getFullYear();

    // get months' names in the array
    for (let i = 1; i <= 12; i++) {
      this.months.push(moment(i, 'MM').format('MMMM'));
      // console.log(this.getDaysOfMonth(i, this.currentYear));
    }

    // initial view is with current month
    this.chosenMonth = moment().format('MMMM');

    // get week days
    this.weekDays = moment.weekdays();

    // get dates of the currect month
    this.dates = this.getDaysOfMonth(
      +moment(this.chosenMonth, 'MMMM').format('M') - 1,
      this.currentYear
    );

    // find the number of weekday according to the week so we can have spaces before starting the month
    this.emptyCells = this.getNumberOfWeekDay(
      this.pipe.transform(this.dates[0], 'EEEE')
    );

    this.getDateEvents(this.dates[1].toISOString());
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
      this.pipe.transform(this.dates[0], 'EEEE')
    );
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

  // take the events for a day
  getDateEvents(date): number {
    console.log(date);
    date = moment(date).subtract(1, 'days').startOf('day');
    this.eventsService.getEventsOfDate(this.pipe.transform(date, 'd-MM-y')).subscribe(events => {
      return events;
    });
    return 0;
  }
}
