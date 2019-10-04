import { Component, OnInit, Input } from '@angular/core';
import { Block } from '@shared/types/block.type';

@Component({
  selector: 'app-block-lesson',
  templateUrl: './block-lesson.component.html',
  styleUrls: ['./block-lesson.component.scss'],
})
export class BlockLessonComponent implements OnInit {

	@Input()  blockData:Block;
	track: number;

  constructor() { }

  ngOnInit() {
		this.track = this.blockData.track;
		// console.log('blockLesson');
		// console.log(this.blockData);
  }

}
