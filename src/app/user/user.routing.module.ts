import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsergroupsComponent } from './usergroups/usergroups.component';
import { CourseMainComponent } from './courseMain/courseMain.component';
import { BlockComponent } from './block/block.component';

const userRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'groups',
				component: UsergroupsComponent
			}
		]
	},{
		path: '',
		children: [
			{
				path: 'content/:groupid',
				component: CourseMainComponent
			}
		]
	},{
		path: '',
		children: [
			{
				path: 'block/:courseid/:groupid/:blockid',
				component: BlockComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(userRoutes)
	],
	exports: [
		RouterModule
	]
})

export class UserRoutingModule {}
