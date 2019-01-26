import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public months = [];
  public chosenMonth: string;
  public currentYear;
  public days = [];

  constructor() { }

  ngOnInit() {
    // get current year
    this.currentYear = (new Date()).getFullYear();

    // get months' names in the array
    for (let i = 1 ; i <= 12 ; i++) {
      this.months.push(moment(i, 'MM').format('MMMM'));
      // console.log(this.getDaysOfMonth(i, this.currentYear));
    }
  }

  // get all the days of a month
  getDaysOfMonth(month, year) {
    console.log(month);
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  // fill the calendar with the chosen month's days
  onChoseMonth() {
    const monthNumber = +moment(this.chosenMonth, 'MMMM').format('M') - 1;
    this.days = this.getDaysOfMonth( monthNumber, this.currentYear);
    console.log(this.days);
  }

}
