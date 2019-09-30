import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ExamRoutingModule } from './exam.routing.module';
import { AccesoriesModule } from '@shared/accesories/accesories.module';

import { ExamComponent } from './exam.component';

@NgModule({
  declarations: [ExamComponent],
  imports: [
    CommonModule,
		ExamRoutingModule,
		AccesoriesModule,
		MatSelectModule,
		FormsModule
  ]
})
export class ExamModule { }
