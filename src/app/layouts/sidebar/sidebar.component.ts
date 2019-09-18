import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
		path: string;
		title: string;
		type: string;
		icontype: string;
		collapse?: string;
		children?: ChildrenItems[];
}

export interface ChildrenItems {
		path: string;
		title: string;
		ab: string;
		type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
				path: '/dashboard',
				title: 'Panel',
				type: 'link',
				icontype: 'dashboard'
		},{
				path: '/calendar',
				title: 'Calendario',
				type: 'link',
				icontype: 'date_range'
		},{
				path: '/user/groups',
				title: 'Mis cursos',
				type: 'link',
				icontype: 'library_books'
		},{
				path: '/forms',
				title: 'Editor',
				type: 'sub',
				icontype: 'content_paste',
				collapse: 'forms',
				children: [
						{path: 'regular', title: 'Regular Forms', ab:'RF'},
						{path: 'extended', title: 'Extended Forms', ab:'EF'},
						{path: 'validation', title: 'Validation Forms', ab:'VF'},
						{path: 'wizard', title: 'Wizard', ab:'W'}
				]
		},{
				path: '/tables',
				title: 'Listados',
				type: 'sub',
				icontype: 'grid_on',
				collapse: 'tables',
				children: [
						{path: 'regular', title: 'Regular Tables', ab:'RT'},
						{path: 'extended', title: 'Extended Tables', ab:'ET'},
						{path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
				]
		},{
				path: '/widgets',
				title: 'Administrador',
				type: 'link',
				icontype: 'widgets'
		},{
				path: '/charts',
				title: 'Reportes',
				type: 'link',
				icontype: 'timeline'
		}
];

@Component({
	selector: 'app-sidebar-cmp',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	public menuItems: any[];
		ps: any;
		isMobileMenu() {
				if ($(window).width() > 991) {
						return false;
				}
				return true;
		};

	constructor() { }

	ngOnInit() {
		this.menuItems = ROUTES.filter(menuItem => menuItem);
		if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
				const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
				this.ps = new PerfectScrollbar(elemSidebar);
		}
	}

	updatePS(): void  {
			if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
					this.ps.update();
			}
	}
	isMac(): boolean {
			let bool = false;
			if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
					bool = true;
			}
			return bool;
	}
}
