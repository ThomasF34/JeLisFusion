import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { WorkshopService} from "../share/service/workshop.service";

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, differenceInMonths, getMonth
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';
import {Workshop} from "../share/model/workshop.models";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})


export class CalendarComponent implements OnInit{

  workshops: Workshop[];

  events: CalendarEvent[];

  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  activeDayIsOpen: boolean = true;
  view: string = 'month';
  viewDate: Date = new Date();

  constructor(private workshopService: WorkshopService, private router: Router){}

  ngOnInit(){
    this.workshopService.getAll().subscribe( workshops => {
      this.workshops = workshops;
      const loadingEvent = [];
      this.workshops.forEach(function (workshop) {
        loadingEvent.push({
          id: workshop.idWorkshop,
          start: new Date(workshop.dateWorkshop.toLocaleString()),
          title: workshop.titleWorkshop,
          color: colors.blue,
        });
      });
      this.events = loadingEvent;
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    console.log(getMonth(date));
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    } /*else {
      console.log(differenceInMonths(date, this.viewDate))
      if(differenceInMonths(date, this.viewDate) == -1){
        ()
      }
*/
    }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.router.navigate(['/atelier/'+event.id])
  }
}
