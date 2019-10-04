import { Component, OnInit, Input } from '@angular/core';

import { Question } from '@shared/types/block.type';

@Component({
  selector: 'app-tf',
  templateUrl: './tf.component.html',
  styleUrls: ['./tf.component.scss']
})
export class TfComponent implements OnInit {

	@Input() selectedValue: string;
	@Input() questionNumber: number;
	@Input() question: Question;

  constructor() { }

  ngOnInit() {
  }

}
