import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private globals: Globals) { }

  createEvent(event) {
    return this.http.post(`${this.globals.API_URL}/create-event`, event);
  }

  // get the events of a date
  getEventsOfDate(date) {
    return this.http.get(`${this.globals.API_URL}/date-events/${date}`);
  }

}
