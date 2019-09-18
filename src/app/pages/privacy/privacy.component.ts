import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
	selector: 'app-privacy',
	templateUrl: './privacy.component.html',
	styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

	url: string;
	support: string;

	constructor() { }

	ngOnInit() {
		this.url = environment.urlLibreta;
		this.support = environment.emailSupport;
	}

}
