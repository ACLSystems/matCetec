import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserCourseService } from '@shared/services/userCourse.service';
import { Block } from '@shared/types/block.type';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
	providers: [
		UserCourseService
	]
})
export class BlockComponent implements OnInit {

	groupid: string;
	blockid: string;
	loading: boolean;
	blockData: Block;
	track: number;

  constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private userCourseService: UserCourseService
	) {
		this.loading = true;
		this.activatedRoute.params.subscribe(params => {
				this.groupid = params.groupid;
				this.blockid = params.blockid;
			}
		)
	}

  ngOnInit() {
		this.loading = true;
		this.getNextBlock(this.groupid,this.blockid);
  }

	getNextBlock(groupid:string, blockid:string, lastid?:string) {
		this.userCourseService.getNextBlock(groupid,blockid,lastid)
		.subscribe(data => {
			if(data) {
				this.blockData = data.message;
				console.log(this.blockData);
				this.track = this.blockData.track;
				this.loading = false;
				window.scroll(0,0)
			}
		})
	}

	goGroup(groupid:string) {
		this.router.navigate(['/user/content', groupid])
	}

}
