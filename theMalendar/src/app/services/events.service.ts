import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private globals: Globals) { }

  createEvent(event) {
    return this.http.post(`${this.globals.API_URL}/create-event`, event);
  }

  // get event by id
  getEvent(id: number) {
    return this.http.get(`${this.globals.API_URL}/event/${id}`);
  }

  // count the events of a date
  countEventsOfDate(date) {
    return this.http.get(`${this.globals.API_URL}/count-date-events/${date}`);
  }

  // get the events of a date
  getEventsOfDate(date) {
    return this.http.get(`${this.globals.API_URL}/get-date-events/${date}`);
  }

  // update an event
  updateEvent(event) {
    return  this.http.put(`${this.globals.API_URL}/event/${event.id}`, {
      title: event.title,
      place: event.place,
      attendees: event.attendees,
      description: event.description,
      time: event.time,
    });
  }

  // delete an event
  deleteEvent(id: number) {
    return this.http.delete(`${this.globals.API_URL}/event/${id}`);
  }

}
