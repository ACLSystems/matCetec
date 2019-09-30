import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from '@shared/spinners/loading.component';

@NgModule({
  declarations: [
		LoadingSpinnerComponent
	],
  imports: [
    CommonModule
  ],
	exports: [
		LoadingSpinnerComponent
	]
})
export class AccesoriesModule { }
