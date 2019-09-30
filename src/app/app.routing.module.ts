import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthGuard } from '@shared/guards/auth.guard';

import { PagesComponent } from '@layouts/pages.component';
import { LandingComponent } from '@layouts/landing.component';
import { LoggedComponent } from '@layouts/logged.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/pages/home',
		pathMatch: 'full'
	},{
		path: 'recover/:tokentemp/:username',
		redirectTo: '/land/lostpass/:tokentemp/:username',
		pathMatch: 'prefix'
	},{
		path: 'userconfirm/:tokentemp/:username',
		redirectTo: '/land/userconfirm/:tokentemp/:username',
		pathMatch: 'prefix'
	},{
		path: 'confirm/:tokentemp/:username/:name/:fathername/:mothername',
		redirectTo: '/land/confirm/:tokentemp/:username/:name/:fathername/:mothername',
		pathMatch: 'prefix'
	},{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'pages',
				loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule)
			}
		]
	},{
		path: '',
		component: LandingComponent,
		children: [
			{
				path: 'land',
				loadChildren: () => import('./landing/landing.module').then(mod => mod.LandingModule)
			}
		]
	},{
		path: '',
		component: LoggedComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
			}
		]
	},{
		path: '',
		component: LoggedComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'user',
				loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
			}
		]
	},{
		path: '',
		component: LoggedComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'calendar',
				loadChildren: () => import('./dashboard/calendar/calendar.module').then(mod => mod.CalendarModule)
			}
		]
	},{
		path: '',
		canActivate: [AuthGuard],
		children: [
			{
				path: 'exam',
				loadChildren: () => import('./exam/exam.module').then(mod => mod.ExamModule)
			}
		]
	},{
		path: 'test',
		component: TestComponent
	},{
		path: '**',
		redirectTo: '/pages/error'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(
		routes,{
			useHash:true,
			// enableTracing: true,
			scrollPositionRestoration: 'enabled'
		})
	],
  exports: [RouterModule]
})

export class AppRoutingModule { }
