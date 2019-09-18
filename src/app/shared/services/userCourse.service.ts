import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { CommonService } from '@shared/services/common.service';
import { JSONHeaders } from '@shared/services/httpHeaders';
import { environment } from '@env/environment';

@Injectable()
export class UserCourseService {

	public url: string;
	public token: string;
	public resultQueryCours: any[];
	public idRQ: string;

	constructor(
		public http: HttpClient,
		private userService: UserService,
		private commonService: CommonService
	) {
		this.url = environment.url;
		this.token = this.userService.getToken();
	}

	getCourses():Observable<any>{
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				'Bearer ' + this.commonService.getToken()
			)
		};
		const route = this.url+'api/v1/user/mygroups';
		return this.http.get(route, httpOptions);
	}

	getCoursesOrg():Observable<any>{
		const httpOptions = {
			params: new HttpParams().set(
				'org', environment.instanceName
			)
		}
		const route = this.url+'api/course/list';
		return this.http.get(route,httpOptions);
	}
}
