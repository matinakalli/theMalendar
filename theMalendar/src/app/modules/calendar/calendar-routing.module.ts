import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

const calendarRoutes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(calendarRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
