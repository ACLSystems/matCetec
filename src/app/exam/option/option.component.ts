import { Component, OnInit, Input } from '@angular/core';

import { Question } from '@shared/types/block.type';

@Component({
	selector: 'app-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

	@Input() selectedValue: string;
	@Input() questionNumber: number;
	@Input() question: Question;

	constructor() { }

	ngOnInit() {
	}

}
