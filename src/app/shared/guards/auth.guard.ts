import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '@shared/services/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

	token: string;

	constructor(
		private userService: UserService,
		private router: Router
	) {
	}

	canActivate(route: ActivatedRouteSnapshot,
		router: RouterStateSnapshot):
			boolean | UrlTree |
			Promise<boolean | UrlTree> |
			Observable<boolean | UrlTree>{
		this.token = this.userService.getToken()
		if(this.token) {
			return true;
		} else {
			return this.router.createUrlTree(['/pages/login']);
		}

	}
}
