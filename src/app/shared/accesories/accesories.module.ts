import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingSpinnerComponent } from '@shared/spinners/loading.component';
import { SharedFooterComponent } from '@shared/footer/footer.component';

@NgModule({
  declarations: [
		LoadingSpinnerComponent,
		SharedFooterComponent
	],
  imports: [
    CommonModule,
		RouterModule
  ],
	exports: [
		LoadingSpinnerComponent,
		SharedFooterComponent
	]
})
export class AccesoriesModule { }
