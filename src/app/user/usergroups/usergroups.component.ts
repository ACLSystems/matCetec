import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@shared/services/user.service';
import { environment } from '@env/environment';
import { UserCourseService } from '@shared/services/userCourse.service';

@Component({
	selector: 'app-usergroups',
	templateUrl: './usergroups.component.html',
	styleUrls: ['./usergroups.component.scss'],
	providers: [UserService, UserCourseService]
})
export class UsergroupsComponent implements OnInit {

	identity: any;
	token: any;
	cursoslist: any[] = [];
	cursosinactive: any[] = [];
	cursosnext: any[] = [];
	loading = false;
	messageNewUser = false;
	color:string;

	constructor(
		private router: Router,
		private userService: UserService,
		private userCourseService: UserCourseService
	) {
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
	}

	ngOnInit() {
		this.loading = true;
		this.identity = this.userService.getidentity();
		this.color = environment.color;
		this.getCourseUser();
	}

	getCourseUser() {
		this.loading = true;
		this.userCourseService.getCourses().subscribe(data => {
			const mycursos = data.message.groups;
			this.userCourseService.getCoursesOrg().subscribe( res => {
				for (const idcr of res.message.courses) {
					for (const idmg of mycursos) {
						if (idcr.id === idmg.courseid ) {
							if (idmg.status === 'active') {
								this.cursoslist.push({
									curso: idmg,
									imagen: idcr.image
								});
							} else if (idmg.status === 'closed') {
								this.cursosinactive.push({
									curso: idmg,
									imagen: idcr.image
								});
							} else if (idmg.status === 'coming') {
								this.cursosnext.push({
									curso: idmg,
									imagen: idcr.image
								});
							}
						}
					}
				}
			});
			this.messageNewUser = false;
			this.loading = false;
		}, error => {
			if (error._body.includes('"message":"No groups found"')) {

			}
			this.messageNewUser = error._body.includes('"message":"No groups found"');
			this.loading = false;
		});
	}

	/*
  Metodo para redireccionar al usuario al curso que selecciono
  */
  public getMycourse(course: string, groupid: string, courseid: string, lastSeenBlock: string, firstBlock: string) {
    if (!lastSeenBlock) {
      this.router.navigate(['/user/mycourses', course, groupid, courseid, firstBlock]);
    } else {
      this.router.navigate(['/user/mycourses', course, groupid, courseid, lastSeenBlock]);
    }
  }

}
