import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserRoutingModule } from './user.routing.module';
import { AccesoriesModule } from '@shared/accesories/accesories.module';

import { SafePipe } from '@shared/pipes/video.pipe';

import { ExamModule } from '../exam/exam.module';

import { UsergroupsComponent } from './usergroups/usergroups.component';
import { CourseMainComponent } from './courseMain/courseMain.component';
import { BlockComponent } from './block/block.component';
import { BlockLessonComponent } from './block-lesson/block-lesson.component';
import { BlockQuestionnarieComponent } from './block-questionnarie/block-questionnarie.component';
import { BlockTasksComponent } from './block-tasks/block-tasks.component';


@NgModule({
  declarations: [
		SafePipe,
		UsergroupsComponent,
		CourseMainComponent,
		BlockComponent,
		BlockLessonComponent,
		BlockQuestionnarieComponent,
		BlockTasksComponent
	],
  imports: [
    CommonModule,
		UserRoutingModule,
		AccesoriesModule,
		ExamModule,
		MatFormFieldModule
  ]
})
export class UserModule { }
