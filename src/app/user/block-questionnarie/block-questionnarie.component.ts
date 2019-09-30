import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Block } from '@shared/types/block.type';

@Component({
	selector: 'app-block-questionnarie',
	templateUrl: './block-questionnarie.component.html',
	styleUrls: ['./block-questionnarie.component.scss']
})
export class BlockQuestionnarieComponent implements OnInit {

	@Input()  blockData:Block;
	now: Date;

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		this.now = new Date();
	}

	ngOnDestroy() {
		localStorage.setItem('tempBlock',JSON.stringify(this.blockData));
	}

	goExam() {
		this.router.navigate(['/exam']);
	}

}
