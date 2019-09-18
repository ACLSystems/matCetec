import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user.routing.module';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';



@NgModule({
  declarations: [
		UsergroupsComponent,
		CoursePanelComponent
	],
  imports: [
    CommonModule,
		UserRoutingModule
  ]
})
export class UserModule { }
