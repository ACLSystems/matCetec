import { Component, OnInit, Input } from '@angular/core';

import { Question } from '@shared/types/block.type';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

	@Input() selectedValue: string;
	@Input() questionNumber: number;
	@Input() question: Question;

	constructor() { }

	ngOnInit() {
		// console.log('groupComponent')
		// console.log(this.question);
	}

}
