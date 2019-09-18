import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsergroupsComponent } from './usergroups/usergroups.component';

const userRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'groups',
				component: UsergroupsComponent
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
