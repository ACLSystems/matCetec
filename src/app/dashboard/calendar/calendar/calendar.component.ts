import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { environment } from '@env/environment';

import { UserService } from '@shared/services/user.service';
import { EventService } from '../event.service';


@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	providers: [
		UserService,
		EventService,
		DatePipe
	]
})
export class CalendarComponent implements OnInit {

	identity: any;
	token: string;
	loading: boolean;
	calendarPlugins = [
		dayGridPlugin,
		timeGridPlugin,
		listPlugin];
	colorevents: any[] = environment.colorEvents;
	calendarWeekends:boolean = true;
	calendarEvents: EventInput[] = [];
	locale: esLocale;

	constructor(
		private userService: UserService,
		private eventService: EventService,
		private datePipe: DatePipe,
		private router: Router
	) {
		this.token = this.userService.getToken();
		this.identity = this.userService.getidentity();
	}

	ngOnInit() {
		if(this.token === null && this.identity === null) {
			this.router.navigate(['/pages/login']);
		} else {
			this.loadEvents();
		}
	}

	loadEvents(){
		this.loading = true;
		this.eventService.getEventSchedule().subscribe(res => {
			for (const id of res.message.groups){
				this.calendarEvents.push({
					title: 'curso: ' + id.name,
					start: this.datePipe.transform(id.beginDate, 'yyyy-MM-dd'),
					end: this.datePipe.transform(id.endDate, 'yyyy-MM-dd')
					// color: environment.eventColor,
					// textColor: environment.textColor
				});
			}
			this.loading = false;
		});
	}

}
