import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Block, Questionnarie, Question } from '@shared/types/block.type';

@Component({
	selector: 'app-exam',
	templateUrl: './exam.component.html',
	styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

	loading: boolean;
	blockData: Block;
	today: Date;
	questionNumber: number;
	question: Question;
	questionnarie: Questionnarie;
	nextButton: boolean;
	prevButton: boolean;
	selectedValue: string;

	constructor(
		private router: Router
	) {
		this.today = new Date();
	}

	ngOnInit() {
		this.loading = true;
		const data = JSON.parse(localStorage.getItem('tempBlock'));
		if(data) {
			this.blockData = data;
			localStorage.removeItem('tempBlock');
			this.initQuestions();
			setTimeout(() => {
				this.loading = false;
			}, 2000);
		} else {
			this.router.navigate(['/']);
		}
	}

	initQuestions() {
		this.questionNumber = 0;
		this.questionnarie = this.blockData.questionnarie;
		this.question = this.questionnarie.questions[this.questionNumber];
		this.checkButtons();
		console.log(this.question);
	}

	nextQuestion() {
		console.log(this.selectedValue);
		this.questionNumber++;
		this.question = this.questionnarie.questions[this.questionNumber];
		this.checkButtons();
		this.selectedValue = undefined;
		console.log(this.question);
	}

	prevQuestion() {
		this.questionNumber--;
		this.question = this.questionnarie.questions[this.questionNumber];
		this.checkButtons();
		this.selectedValue = undefined;
		console.log(this.question);
	}

	checkButtons() {
		if(this.questionnarie.questions[this.questionNumber+1]) {
			this.nextButton = true;
		} else {
			this.nextButton = false;
		}
		if(this.questionnarie.questions[this.questionNumber-1]) {
			this.prevButton = true;
		} else {
			this.prevButton = false;
		}
	}

}
